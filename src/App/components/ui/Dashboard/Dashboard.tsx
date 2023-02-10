import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getDoctorsList, removeDoctor } from '../../../store/doctors';
import Specializations from '../Specializations/Specializations';
import AddNewDoctorForm from '../AddNewDoctorForm';
import Modal from '../../modal/Modal';
import EditDoctorForm from '../EditDocForm';
import { TDoc } from '../../../types/types';

type TProps = {
  docData: TDoc;
};
const initialState = {
  _id: '',
  name: '',
  password: '',
  specialization: '',
  mail: '',
  username: '',
  image: '',
  surname: '',
};

function Dashboard() {
  const doctors = useAppSelector(getDoctorsList());
  const [isModalActive, setModalActive] = useState(false);
  const [docData, setDocData] = useState<TProps['docData']>(initialState);
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    dispatch(removeDoctor(id));
  };

  const handleEdit = (doc: TProps['docData']) => {
    setDocData(doc);
    setModalActive(true);
  };

  const handleModalClose = () => {
    setModalActive(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '60%' }}>
        {doctors.map((doc) => (
          <div key={doc._id}>
            <div>Name: {doc.name}</div>
            <div>Surname: {doc.surname}</div>
            <img style={{ width: 200, height: 200 }} src={doc.image} alt="avatar" />
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
