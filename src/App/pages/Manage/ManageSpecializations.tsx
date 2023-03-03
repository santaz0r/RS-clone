import { useState } from 'react';
import styles from './ManageSpecializations.module.scss';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getSpecializations, removeSpecialization } from '../../store/specializations';
import Modal from '../../components/modal/Modal';
import EditSpecializationForm from '../../components/ui/Specializations/EditSpecForm';
import AddNewSpecializationForm from '../../components/ui/Specializations/AddSpecForm';
import btnStyle from '../../components/ui/FormBtn.module.scss';
import { getLang } from '../../store/language';
import { locText } from '../../services/locText';

type TSpec = {
  name: string;
  _id: string;
};

function Specializations() {
  const specializations = useAppSelector(getSpecializations()) as TSpec[];
  const currentLang = useAppSelector(getLang());
  const [isModalActive, setModalActive] = useState(false);
  const [specData, setSpecData] = useState({
    name: '',
    _id: '',
  });
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    dispatch(removeSpecialization(id));
  };

  const handleEdit = (spec: TSpec) => {
    setSpecData(spec);
    setModalActive(true);
  };

  const handleModalClose = () => {
    setModalActive(false);
  };

  return (
    <div className={styles.specializations}>
      {specializations.map((specialization) => (
        <div className={styles.specialization} key={specialization._id}>
          <p className={styles.specializationName}>{specialization.name}</p>
          <div className={styles.buttons}>
            <button
              type="button"
              className={`${styles.buttonsEdit} ${btnStyle.submit_btn}`}
              onClick={() => handleEdit(specialization)}
            >
              {locText('edit', currentLang)}
            </button>
            <button
              type="button"
              className={`${styles.buttonsRemove} ${btnStyle.submit_btn}`}
              onClick={() => handleDelete(specialization._id as string)}
            >
              {locText('delete', currentLang)}
            </button>
          </div>
        </div>
      ))}
      {isModalActive && (
        <Modal setActive={setModalActive}>
          <EditSpecializationForm specData={specData} onClose={handleModalClose} />
        </Modal>
      )}
    </div>
  );
}

function ManageSpecializations() {
  return (
    <div>
      <div className={styles.add}>
        <AddNewSpecializationForm />
      </div>
      <Specializations />
    </div>
  );
}

export default ManageSpecializations;