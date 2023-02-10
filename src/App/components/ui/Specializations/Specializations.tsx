import { useAppSelector } from '../../../../hooks';
import { getLocalizedText } from '../../../services/localizationService';
import { getSpecializationById, getSpecializationsLoadingStatus } from '../../../store/specializations';

function Specializations({ id }: { id: string }) {
  const specLoadingStatus = useAppSelector(getSpecializationsLoadingStatus());
  const spec = useAppSelector(getSpecializationById(id));
  if (!specLoadingStatus) {
    return (
      <div>
        {getLocalizedText('specialization')}: {spec?.name}
      </div>
    );
  }
  return <div>{getLocalizedText('specialization')}: Loading...</div>;
}

export default Specializations;
