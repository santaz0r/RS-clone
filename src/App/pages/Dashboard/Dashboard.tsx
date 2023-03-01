import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getDoctorsList, removeDoctor } from '../../store/doctors';
import Specializations from '../../components/ui/Specializations/Specializations';
import AddNewDoctorForm from '../../components/ui/AddNewDoctorForm';
import Modal from '../../components/modal/Modal';
import EditDoctorForm from '../../components/ui/EditDocForm';
import { TDoc } from '../../types/types';
import styles from './Dashboard.module.scss';
import { getLang } from '../../store/language';
import { locText } from '../../services/locText';

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
  const currentLang = useAppSelector(getLang());
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
            <div>{locText('contacts', currentLang)}:</div>
            <div>
              - {locText('email', currentLang)}: {doc.mail}
            </div>
            <div className={styles.doc__btns}>
              <button className={styles.doc__btn} onClick={() => handleDelete(doc._id)} type="button">
                {locText('delete', currentLang)}
              </button>
              <button className={styles.doc__btn} onClick={() => handleEdit(doc)} type="button">
                {locText('edit', currentLang)}
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
      <NavLink to="/manage/specializations">
        <button type="button">{locText('manageSpecializations', currentLang)}</button>
      </NavLink>
    </div>
  );
}

export default Dashboard;
