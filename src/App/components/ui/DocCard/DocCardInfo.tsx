import { useAppSelector } from '../../../../hooks';
import { getLocalizedText } from '../../../services/localizationService';
import { getDoctorById } from '../../../store/doctors';
import Specializations from '../Specializations/Specializations';

function DocCardInfo({ id }: { id: string }) {
  const doc = useAppSelector(getDoctorById(id));
  if (doc) {
    return (
      <>
        <div>
          {getLocalizedText('name')}: {doc.name} {doc.surname}
        </div>
        <div>
          <Specializations id={doc.specialization} />
        </div>
      </>
    );
  }

  return <p>not found</p>;
}

export default DocCardInfo;
