import { useAppDispatch, useAppSelector } from '../../../hooks';
import DocCardInfo from '../../components/ui/DocCard/DocCardInfo';
import {
  getSessionsByCurrentClient,
  getSessionsList,
  getSessionsLoadingStatus,
  removeSession,
} from '../../store/sessions';
import { getCurrentUserData } from '../../store/users';
import styles from './Sessions.module.scss';
import btnStyle from '../../components/ui/FormBtn.module.scss';
import { getLang } from '../../store/language';
import { locText } from '../../services/locText';

function Sessions() {
  const { id, role } = useAppSelector(getCurrentUserData());
  const currentLang = useAppSelector(getLang());
  const dispatch = useAppDispatch();
  const sessionsLoadingStatus = useAppSelector(getSessionsLoadingStatus());
  const sessions = id
    ? role === 'admin'
      ? useAppSelector(getSessionsList())
      : useAppSelector(getSessionsByCurrentClient(id))
    : [];
  const handleCancel = (sessionId: string) => {
    dispatch(removeSession(sessionId));
  };
  if (sessionsLoadingStatus) return <h2>{locText('loading', currentLang)}</h2>;
  return (
    <div className={styles.sessions}>
      <h2 className={styles.sessions__title}>
        {role === 'admin' ? locText('allSessions', currentLang) : locText('mySessions', currentLang)}
      </h2>
      <div className={styles.sessions__wrapper}>
        {sessions.length ? (
          sessions.map((s) => (
            <div className={styles.sessions__item__wrapper} key={s._id}>
              <div className={styles.sessions__item} key={s._id}>
                <div className={styles.sessions__doc}>
                  {locText('yourDoc', currentLang)}
                  <DocCardInfo id={s.doctorId} />
                </div>
                <p>
                  {locText('takingTime', currentLang)}: {s.date}
                </p>
                <button className={btnStyle.submit_btn} type="button" onClick={() => handleCancel(s._id)}>
                  {locText('cancel', currentLang)}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--text-color)' }}>{locText('empty', currentLang)}</p>
        )}
      </div>
    </div>
  );
}

export default Sessions;
