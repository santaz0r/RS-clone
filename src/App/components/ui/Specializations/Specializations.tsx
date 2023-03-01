import { useAppSelector } from '../../../../hooks';
import { locText } from '../../../services/locText';
import { getLang } from '../../../store/language';

import { getSpecializationById, getSpecializationsLoadingStatus } from '../../../store/specializations';

function Specializations({ id }: { id: string }) {
  const specLoadingStatus = useAppSelector(getSpecializationsLoadingStatus());
  const spec = useAppSelector(getSpecializationById(id));
  const currentLang = useAppSelector(getLang());

  return (
    <div>
      {locText('specialization', currentLang)}: {!specLoadingStatus ? spec?.name : 'loading'}
    </div>
  );
}

export default Specializations;
