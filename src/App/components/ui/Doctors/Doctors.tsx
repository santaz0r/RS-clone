import { useAppSelector } from '../../../../hooks';
import { getDoctorsList } from '../../../store/doctors';
import Specializations from '../Specializations/Specializations';

function Doctors() {
  const doctors = useAppSelector(getDoctorsList());

  return (
    <ul>
      {doctors.map((doc) => (
        <li key={doc._id}>
          <p>Name: {doc.name}</p>

          <Specializations id={doc.specialization} />
        </li>
      ))}
    </ul>
  );
}

export default Doctors;
