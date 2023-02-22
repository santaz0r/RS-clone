import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getCurrentUserData, logOut } from '../../../store/users';

function NavProfile() {
  const dispatch = useAppDispatch();
  const { role, username } = useAppSelector(getCurrentUserData());
  const isAdmin = role === 'admin';
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/', { replace: true });
  };
  return (
    <div>
      <div>{username}</div>
      {isAdmin && <NavLink to="dashboard">Admin Dashboard</NavLink>}
      <NavLink to="/my-sessions">My sessions</NavLink>
      <button type="button" onClick={handleLogOut}>
        logout
      </button>
    </div>
  );
}

export default NavProfile;
