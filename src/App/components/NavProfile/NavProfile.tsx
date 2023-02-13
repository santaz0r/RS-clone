import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { logOut } from '../../store/usersStore';

function NavProfile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/', { replace: true });
  };
  return (
    <div>
      some user name
      <NavLink to="dashboard">Admin Dashboard</NavLink>
      <button type="button" onClick={handleLogOut}>
        logout
      </button>
    </div>
  );
}

export default NavProfile;
