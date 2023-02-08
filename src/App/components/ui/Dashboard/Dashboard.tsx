import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getDoctorsList, removeDoctor } from '../../../store/doctors';
import Specializations from '../Specializations/Specializations';
import AddNewDoctorForm from '../AddNewDoctorForm';

function Dashboard() {
  const doctors = useAppSelector(getDoctorsList());
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    dispatch(removeDoctor(id));
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '60%', columnCount: 2, columnWidth: 200 }}>
        {doctors.map((doc) => (
          <div key={doc._id}>
            <div>Name: {doc.name}</div>
            <Specializations id={doc.specialization} />
            <div>Contacts:</div>
            <div>email: {doc.mail}</div>
            <button onClick={() => handleDelete(doc._id)} type="button">
              delete doc
            </button>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <AddNewDoctorForm />
      </div>
    </div>
  );
}

export default Dashboard;
