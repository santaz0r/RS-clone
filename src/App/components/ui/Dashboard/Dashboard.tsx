import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getDoctorsList, removeDoctor } from '../../../store/doctors';
import Specializations from '../Specializations/Specializations';
import AddNewDoctorForm from '../AddNewDoctorForm';
import Modal from '../../modal/Modal';
import EditDoctorForm from '../EditDocForm';
import { TDoc } from '../../../types/types';
import { getLocalizedText } from '../../../services/localizationService';

import styles from './Dashboard.module.scss';

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
    <div className={styles.dash__wrapper}>
      <div className={styles.dash__docs}>
        {doctors.map((doc) => (
          <div key={doc._id} className={styles.dash__doc}>
            <div className={styles.doc__name}>
              {doc.name} {doc.surname}
            </div>

            <img src={doc.image} alt="avatar" />
            <Specializations id={doc.specialization} />
            <div>{getLocalizedText('contacts')}:</div>
            <div>
              - {getLocalizedText('email')}: {doc.mail}
            </div>
            <div className={styles.doc__btns}>
              <button className={styles.doc__btn} onClick={() => handleDelete(doc._id)} type="button">
                {getLocalizedText('delete')}
              </button>
              <button className={styles.doc__btn} onClick={() => handleEdit(doc)} type="button">
                {getLocalizedText('edit')}
              </button>
            </div>
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
