import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getCurrentUserData, logOut } from '../../../store/users';
import styles from './NavProfile.module.scss';
import { getLang } from '../../../store/language';
import { locText } from '../../../services/locText';

function NavProfile() {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector(getCurrentUserData());
  const currentLang = useAppSelector(getLang());
  const isAdmin = role === 'admin';
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/', { replace: true });
  };
  return (
    <li className={styles.navigation__buttons}>
      {isAdmin && (
        <NavLink className={styles.navigation__btn} to="dashboard">
          {locText('adminDash', currentLang)}
        </NavLink>
      )}
      <NavLink className={styles.navigation__btn} to="/my-sessions">
        {isAdmin ? locText('allSessions', currentLang) : locText('mySessions', currentLang)}
      </NavLink>
      <button type="button" className={styles.navigation__btn} onClick={handleLogOut}>
        {locText('logout', currentLang)}
      </button>
    </li>
  );
}

export default NavProfile;
