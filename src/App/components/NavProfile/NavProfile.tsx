import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { logOut } from '../../store/usersStore';
import navigate from '../../utils/navigate';

function NavProfile() {
  const dispatch = useAppDispatch();
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
