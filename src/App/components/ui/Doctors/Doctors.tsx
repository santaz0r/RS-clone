import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getDoctorsList, removeDoctor } from '../../../store/doctors';
import Specializations from '../Specializations/Specializations';

function Doctors() {
  const doctors = useAppSelector(getDoctorsList());
  const dispatch = useAppDispatch();
  const handleDelete = (id: number | string) => {
    dispatch(removeDoctor(id));
  };
  return (
    <ul>
      {doctors.map((doc) => (
        <li key={doc._id}>
          <p>Name: {doc.name}</p>

          <Specializations id={doc.specialization} />

          <button onClick={() => handleDelete(doc._id)} type="button">
            delete doc
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Doctors;
