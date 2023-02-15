import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { logOut } from '../../store/users';

function NavProfile({ isAdmin }: { isAdmin: boolean }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/', { replace: true });
  };
  return (
    <div>
      some user name
      {isAdmin && <NavLink to="dashboard">Admin Dashboard</NavLink>}
      <NavLink to="/my-sessions">My sessions</NavLink>
      <button type="button" onClick={handleLogOut}>
        logout
      </button>
    </div>
  );
}

export default NavProfile;
