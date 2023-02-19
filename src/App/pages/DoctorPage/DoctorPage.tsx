import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getDoctorById } from '../../store/doctors';
import Specializations from '../../components/ui/Specializations/Specializations';
import { getCurrentUserData } from '../../store/users';
import SelectField from '../../components/form/SelectedField';
import { getLocalizedText } from '../../services/localizationService';
import validator from '../../utils/validator';
import { createSession, getSessionsByCurrentClient, getSessionsByCurrentDoctor } from '../../store/sessions';

const timeOptions = [
  { label: '12:00', value: '12:00:00' },
  { label: '13:00', value: '13:00:00' },
  { label: '14:00', value: '14:00:00' },
  { label: '15:00', value: '15:00:00' },
  { label: '16:00', value: '16:00:00' },
  { label: '17:00', value: '17:00:00' },
  { label: '18:00', value: '18:00:00' },
];

function DoctorPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { id: userId, role } = useAppSelector(getCurrentUserData());
  const doctor = id ? useAppSelector(getDoctorById(id)) : null;
  const currentDocSessions = doctor ? useAppSelector(getSessionsByCurrentDoctor(doctor?._id)) : null;
  const currentUserSessions = userId ? useAppSelector(getSessionsByCurrentClient(userId)) : null;
  console.log('currentUserSessions', currentUserSessions);

  const timestamp = new Date();
  const todayDate = `${timestamp.getFullYear().toString()}-${(timestamp.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${timestamp.getDate().toString()}`;
  const deltaMonth = todayDate
    .split('-')
    .map((i, index) => (index === 1 ? (Number(i) + 2).toString().padStart(2, '0') : i))
    .join('-');

  const [sessionsData, setSessionData] = useState({
    date: todayDate,
    time: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({ date: '', time: '' });
  console.log(currentDocSessions);
  const hasSession = currentUserSessions?.some((sess) => sess.doctorId === doctor?._id);
  console.log(hasSession);
  const filteredOptions = timeOptions.filter((time) => {
    if (currentDocSessions?.length) {
      for (let i = 0; i < currentDocSessions.length; i += 1) {
        const date = currentDocSessions[i].date.split('T')[0];
        const docTime = currentDocSessions[i].date.split('T')[1].slice(0, 8);
        if (date === sessionsData.date && time.value === docTime) return null;
      }
      return time;
    }
    return [];
  });
  const dateNow = new Date();
  console.log(dateNow.toLocaleString());
  // const kekFilter = filteredOptions.filter(time=> {

  // })

  console.log(filteredOptions);
  const validatorConfig = {
    date: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
    },
    time: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
    },
  };

  const validate = () => {
    const validateErrors = validator(sessionsData, validatorConfig);
    setErrors(validateErrors);
    return Object.keys(validateErrors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [sessionsData]);
  const isValid = Object.keys(errors).length === 0;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionData((prevState) => ({ ...prevState, date: e.target.value }));
  };

  const handleTimeChange = (target: { name: string; value: string }) => {
    setSessionData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sessionDate = `${sessionsData.date}T${sessionsData.time}.000Z`;
    if (userId && doctor?._id) {
      dispatch(createSession({ clientId: userId, doctorId: doctor?._id, date: sessionDate }));
    }
  };

  if (!doctor) return <h3>Not found</h3>;
  return (
    <div>
      <h3>
        Имя: {doctor.name} {doctor.surname}
      </h3>
      <img src={doctor.image} alt="docPhoto" width={150} />
      <Specializations id={doctor.specialization} />
      <div>
        Description:
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A officia id ducimus quidem nemo aspernatur illum
          doloribus nam quis dolorem officiis expedita, dignissimos enim accusamus quisquam quod libero, delectus sit
          facilis, aliquam praesentium? Libero hic voluptatem, nisi magni animi ullam velit minima perferendis rem
          officiis tempora minus dolorum aperiam odio commodi soluta suscipit corrupti consectetur maiores totam
          excepturi! Architecto id ipsum dignissimos voluptatum eligendi nulla consectetur explicabo deleniti minus odit
          molestias itaque quos iure maiores eaque inventore, odio sed. Debitis assumenda sequi porro incidunt quae
          eveniet ea, excepturi dolorum tempora dolores ex reiciendis quas, labore omnis dolore sit eligendi in quisquam
          minus nesciunt a corrupti sint eaque molestiae. Consectetur quam aspernatur quidem, doloremque perferendis
          quaerat possimus dignissimos adipisci aut cupiditate?
        </p>
      </div>
      {role === 'client' ? (
        <div>
          <h3>{getLocalizedText('timeOfSession')}</h3>
          <div>
            <form onSubmit={handleSubmit}>
              {getLocalizedText('chooseDate')}:{' '}
              <input
                type="date"
                value={sessionsData.date}
                onChange={handleDateChange}
                min={todayDate}
                max={deltaMonth}
                pattern="\d{4}-\d{2}-\d{2}"
              />
              {!hasSession ? (
                filteredOptions.length ? (
                  <SelectField
                    defaultOption="choose..."
                    label="ChooseTime"
                    name="time"
                    onChange={handleTimeChange}
                    options={filteredOptions}
                    value={sessionsData.time}
                    error={errors.time}
                  />
                ) : (
                  <div>{getLocalizedText('occupied')}</div>
                )
              ) : (
                <div>{getLocalizedText('alreadySingUp')}</div>
              )}
              <button disabled={!isValid} type="submit">
                {getLocalizedText('submit')}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default DoctorPage;