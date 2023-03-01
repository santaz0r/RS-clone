import { useAppSelector } from '../../../../hooks';
import { locText } from '../../../services/locText';

import { getDoctorById } from '../../../store/doctors';
import { getLang } from '../../../store/language';
import Specializations from '../Specializations/Specializations';

function DocCardInfo({ id }: { id: string }) {
  const doc = useAppSelector(getDoctorById(id));
  const currentLang = useAppSelector(getLang());
  if (doc) {
    return (
      <>
        <div>
          {locText('name', currentLang)}: {doc.name} {doc.surname}
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
