import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../../../hooks';
import { getDoctorsList } from '../../../store/doctors';
import Specializations from '../Specializations/Specializations';
import { getSpecializations } from '../../../store/specializations';
import { getIsLogin } from '../../../store/users';
import styles from './Doctors.module.scss';
import { getLocalizedText } from '../../../services/localizationService';

function RenderDoctorTile(props: {filters: string}) {
  const isLogIn = useAppSelector(getIsLogin());
  const { filters } = props;
  let doctors = useAppSelector(getDoctorsList());
  if (filters !== 'DEFAULT') doctors = doctors.filter((doctor) => doctor.specialization === filters);
  if (!doctors.length) return <div className={styles.emptyList}>{getLocalizedText('emptyDoctorsList')}</div>;

  return (
    <div className={styles.doctors}>
      {doctors.map((doctor) => (
        <div className={styles.doctor} key={doctor._id}>
          <div className={styles.photoName}>
            <img className={styles.photo__img} src={doctor.image} alt="" />
            <div className={styles.name}>
              {doctor.name} {doctor.surname}
            </div>
          </div>
          <div className={styles.specialization}>
            <Specializations id={doctor.specialization} />
          </div>
          { isLogIn ? (
            <div className={styles.makeAppointment}>
              <button type="button" className={styles.makeAppointmentButton}>
                {getLocalizedText('makeAppointment')}
              </button>
            </div>
          ) : (
            <div className={styles.logInRequiredToAppointment}>
              {getLocalizedText('logInRequiredToAppointment')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Doctors() {
  const specializations = useAppSelector(getSpecializations());
  const [filters, setFilters] = useState('DEFAULT');

  const handleSpecFilterChange = (e: ChangeEvent) => {
    setFilters((e.target as HTMLSelectElement).value);
  };

  return (
    <div className={styles.filtersDoctors}>
      <div className={styles.filters}>
        <select onChange={handleSpecFilterChange} value={filters} className={styles.filter}>
          <option value="DEFAULT" key="DEFAULT">All</option>
          {specializations.map((spec) => (
            <option value={spec._id} key={spec._id}>
              {spec.name}
            </option>
          ))}
        </select>
      </div>
      <RenderDoctorTile filters={filters} />
    </div>
  );
}

export default Doctors;
