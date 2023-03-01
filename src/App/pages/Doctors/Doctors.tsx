import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { getDoctorsList } from '../../store/doctors';
import Specializations from '../../components/ui/Specializations/Specializations';
import { getSpecializations } from '../../store/specializations';
import { getIsLogin } from '../../store/users';
import styles from './Doctors.module.scss';
import SelectField from '../../components/form/SelectedField';
import { TSpec } from '../../types/types';
import { getLang } from '../../store/language';
import { locText } from '../../services/locText';

function RenderDoctorTile(props: { filters: string }) {
  const isLogIn = useAppSelector(getIsLogin());
  const { filters } = props;
  let doctors = useAppSelector(getDoctorsList());
  const currentLang = useAppSelector(getLang());

  if (filters !== 'DEFAULT') doctors = doctors.filter((doctor) => doctor.specialization === filters);
  if (!doctors.length) return <div className={styles.emptyList}>{locText('emptyDoctorsList', currentLang)}</div>;

  return (
    <div className={styles.doctors}>
      {doctors.map((doctor) => (
        <div className={styles.doctor} key={doctor._id}>
          <div className={styles.photoName}>
            <img className={styles.photo__img} src={doctor.image} alt={doctor.name} />
            <div className={styles.name}>
              {doctor.name} {doctor.surname}
            </div>
          </div>
          <div className={styles.specialization}>
            <Specializations id={doctor.specialization} />
          </div>
          {isLogIn ? (
            <div className={styles.makeAppointment}>
              <NavLink to={`../doctor/${doctor._id}`}>
                <button type="button" className={styles.makeAppointmentButton}>
                  {locText('makeAppointment', currentLang)}
                </button>
              </NavLink>
            </div>
          ) : (
            <div className={styles.logInRequiredToAppointment}>
              {locText('logInRequiredToAppointment', currentLang)}
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
  const handleChange = (target: { name: string; value: string }) => {
    setFilters(target.value);
  };
  const transformData = (array: TSpec[]) => {
    if (array) {
      return array.map((spec) => ({
        label: spec.name,
        value: spec._id,
      }));
    }
    return [];
  };

  return (
    <div className={styles.filtersDoctors}>
      <div className={styles.filters}>
        <SelectField
          defaultOption="All"
          error=""
          label="Specialization"
          name="spec"
          onChange={handleChange}
          options={transformData(specializations)}
          value={filters}
          disabledOption={false}
        />
      </div>
      <RenderDoctorTile filters={filters} />
    </div>
  );
}

export default Doctors;
