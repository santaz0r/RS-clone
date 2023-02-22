import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getDoctorsList, removeDoctor } from '../../../store/doctors';
import Specializations from '../Specializations/Specializations';
import AddNewDoctorForm from '../AddNewDoctorForm';
import Modal from '../../modal/Modal';
import EditDoctorForm from '../EditDocForm';
import { TDoc } from '../../../types/types';
import { getLocalizedText } from '../../../services/localizationService';

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
            <div>
              {getLocalizedText('name')}: {doc.name}
            </div>
            <div>
              {getLocalizedText('surname')}: {doc.surname}
            </div>
            <img style={{ width: 200, height: 200 }} src={doc.image} alt="avatar" />
            <Specializations id={doc.specialization} />
            <div>{getLocalizedText('contacts')}:</div>
            <div>
              {getLocalizedText('email')}: {doc.mail}
            </div>
            <button onClick={() => handleDelete(doc._id)} type="button">
              {getLocalizedText('delete')}
            </button>
            <button onClick={() => handleEdit(doc)} type="button">
              {getLocalizedText('edit')}
            </button>
            <hr />
          </div>
        ))}
      </div>
      <div style={{ width: '35%' }}>
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
