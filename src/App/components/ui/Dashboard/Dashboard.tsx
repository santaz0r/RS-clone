import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getDoctorsList, removeDoctor } from '../../../store/doctors';
import Specializations from '../Specializations/Specializations';
import AddNewDoctorForm from '../AddNewDoctorForm';
import Modal from '../../modal/Modal';
import EditDoctorForm from '../EditDocForm';

type TDoc = {
  docData: {
    name: string;
    password: string;
    specialization: string;
    mail: string;
    username: string;
    _id: string;
  };
};
const initialState = {
  _id: '',
  name: '',
  password: '',
  specialization: '',
  mail: '',
  username: '',
};

function Dashboard() {
  const doctors = useAppSelector(getDoctorsList());
  const [isModalActive, setModalActive] = useState(false);
  const [docData, setDocData] = useState<TDoc['docData']>(initialState);
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    dispatch(removeDoctor(id));
  };

  const handleEdit = (doc: TDoc['docData']) => {
    console.log(doc);
    setDocData(doc);
    setModalActive(true);
  };

  const handleModalClose = () => {
    setModalActive(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '60%', columnCount: 2, columnWidth: 300 }}>
        {doctors.map((doc) => (
          <div key={doc._id}>
            <div>Name: {doc.name}</div>
            <Specializations id={doc.specialization} />
            <div>Contacts:</div>
            <div>email: {doc.mail}</div>
            <button onClick={() => handleDelete(doc._id)} type="button">
              delete doc
            </button>
            <button onClick={() => handleEdit(doc)} type="button">
              Edit
            </button>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <AddNewDoctorForm />
      </div>
      {isModalActive && (
        <Modal setActive={setModalActive}>
          <EditDoctorForm docData={docData} onClose={handleModalClose} />
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
