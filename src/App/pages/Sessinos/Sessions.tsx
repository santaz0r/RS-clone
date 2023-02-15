import { useAppSelector } from '../../../hooks';
import DocCardInfo from '../../components/ui/DocCard/DocCardInfo';
import { getLocalizedText } from '../../services/localizationService';
import { getSessionsByCurrentClient, getSessionsLoadingStatus } from '../../store/sessions';
import { getCurrentUserData } from '../../store/users';

function Sessions() {
  const { id } = useAppSelector(getCurrentUserData());
  const sessionsLoadingStatus = useAppSelector(getSessionsLoadingStatus());
  const sessions = id ? useAppSelector(getSessionsByCurrentClient(id)) : [];
  const handleCancel = (sessionId: string) => {
    console.log('id приема: ', sessionId);
  };
  if (sessionsLoadingStatus) return <h2>{getLocalizedText('loading')}</h2>;
  return (
    <>
      <h2>{getLocalizedText('mySessions')}</h2>
      {sessions.map((s) => (
        <div key={s._id}>
          <div>
            {getLocalizedText('yourDoc')}
            <DocCardInfo id={s.doctorId} />
          </div>
          <p>
            {getLocalizedText('takingTime')}: {s.date}
          </p>
          <button type="button" onClick={() => handleCancel(s._id)}>
            {getLocalizedText('cancel')}
          </button>
        </div>
      ))}
    </>
  );
}

export default Sessions;
