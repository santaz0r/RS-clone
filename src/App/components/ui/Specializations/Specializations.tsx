import { useAppSelector } from '../../../../hooks';
import { getSpecializationById, getSpecializationsLoadingStatus } from '../../../store/specializations';

function Specializations({ id }: { id: string }) {
  const specLoadingStatus = useAppSelector(getSpecializationsLoadingStatus());
  const spec = useAppSelector(getSpecializationById(id));
  if (!specLoadingStatus) return <p>specialization: {spec?.name}</p>;
  return <p>specialization: Loading...</p>;
}

export default Specializations;
