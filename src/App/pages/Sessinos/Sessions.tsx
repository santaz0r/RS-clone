import { useAppDispatch, useAppSelector } from '../../../hooks';
import DocCardInfo from '../../components/ui/DocCard/DocCardInfo';
import { getLocalizedText } from '../../services/localizationService';
import {
  getSessionsByCurrentClient,
  getSessionsList,
  getSessionsLoadingStatus,
  removeSession,
} from '../../store/sessions';
import { getCurrentUserData } from '../../store/users';
import styles from './Sessions.module.scss';
import btnStyle from '../../components/ui/FormBtn.module.scss';

function Sessions() {
  const { id, role } = useAppSelector(getCurrentUserData());
  const dispatch = useAppDispatch();
  const sessionsLoadingStatus = useAppSelector(getSessionsLoadingStatus());
  const sessions = id
    ? role === 'admin'
      ? useAppSelector(getSessionsList())
      : useAppSelector(getSessionsByCurrentClient(id))
    : [];
  const handleCancel = (sessionId: string) => {
    console.log('id приема: ', sessionId);
    dispatch(removeSession(sessionId));
  };
  if (sessionsLoadingStatus) return <h2>{getLocalizedText('loading')}</h2>;
  return (
    <div className={styles.sessions}>
      <h2 className={styles.sessions__title}>
        {role === 'admin' ? getLocalizedText('allSessions') : getLocalizedText('mySessions')}
      </h2>
      <div className={styles.sessions__wrapper}>
        {sessions.length ? (
          sessions.map((s) => (
            <div className={styles.sessions__item__wrapper}>
              <div className={styles.sessions__item} key={s._id}>
                <div className={styles.sessions__doc}>
                  {getLocalizedText('yourDoc')}
                  <DocCardInfo id={s.doctorId} />
                </div>
                <p>
                  {getLocalizedText('takingTime')}: {s.date}
                </p>
                <button className={btnStyle.submit_btn} type="button" onClick={() => handleCancel(s._id)}>
                  {getLocalizedText('cancel')}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--text-color)' }}>{getLocalizedText('empty')}</p>
        )}
      </div>
    </div>
  );
}

export default Sessions;
