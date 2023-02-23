import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getLocalizedText } from '../../../services/localizationService';
import { getCurrentUserData, logOut } from '../../../store/users';
import styles from './NavProfile.module.scss';

function NavProfile() {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector(getCurrentUserData());
  const isAdmin = role === 'admin';
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/', { replace: true });
  };
  return (
    <li className={styles.navigation__buttons}>
      {isAdmin && <NavLink className={styles.navigation__btn} to="dashboard">{getLocalizedText('adminDash')}</NavLink>}
      <NavLink className={styles.navigation__btn} to="/my-sessions">{getLocalizedText('mySessions')}</NavLink>
      <button type="button" className={styles.navigation__btn} onClick={handleLogOut}>
        {getLocalizedText('logout')}
      </button>
    </li>
  );
}

export default NavProfile;
