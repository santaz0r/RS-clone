import { useAppSelector } from '../../../../hooks';
import { getSpecializationById, getSpecializationsLoadingStatus } from '../../../store/specializations';

function Specializations({ id }: { id: string }) {
  const specLoadingStatus = useAppSelector(getSpecializationsLoadingStatus());
  const spec = useAppSelector(getSpecializationById(id));
  if (!specLoadingStatus) return <div>Specialization: {spec?.name}</div>;
  return <div>specialization: Loading...</div>;
}

export default Specializations;
