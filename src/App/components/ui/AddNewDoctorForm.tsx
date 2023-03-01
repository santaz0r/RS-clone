import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getSpecializations } from '../../store/specializations';
import validator from '../../utils/validator';
import TextField from '../form/TextField';
import SelectField from '../form/SelectedField';
import { TSpec } from '../../types/types';
import { createDoctor, getCreateError } from '../../store/doctors';
import generateAvatar from '../../utils/generateAvatar';
import { getLocalizedText } from '../../services/localizationService';
import styles from './Form.module.scss';
import btnStyle from './FormBtn.module.scss';

const initialState = {
  name: '',
  password: '',
  specialization: '',
  mail: '',
  username: '',
  image: generateAvatar(),
  surname: '',
};

function AddNewDoctorForm() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>(initialState);
  const [isDisbale, setDisable] = useState(false);
  const specializations = useAppSelector(getSpecializations());
  const createError = useAppSelector(getCreateError());

  const validatorConfig = {
    username: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
      noSpaces: {
        message: getLocalizedText('noSpaces'),
      },
    },
    name: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
      noSpaces: {
        message: getLocalizedText('noSpaces'),
      },
    },
    surname: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
      noSpaces: {
        message: getLocalizedText('noSpaces'),
      },
    },
    specialization: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
      noSpaces: {
        message: getLocalizedText('noSpaces'),
      },
    },
    password: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
      noSpaces: {
        message: getLocalizedText('noSpaces'),
      },
    },
    mail: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
      noSpaces: {
        message: getLocalizedText('noSpaces'),
      },
    },
    image: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
      isUrl: {
        message: getLocalizedText('isUrl'),
      },
      noSpaces: {
        message: getLocalizedText('noSpaces'),
      },
    },
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

  const handleChange = (target: { name: string; value: string }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validate = () => {
    const validateErrors = validator(data, validatorConfig);
    setErrors(validateErrors);
    return Object.keys(validateErrors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidData = validate();
    setDisable(true);
    if (!isValidData) return;

    await dispatch(createDoctor(data));
    setDisable(false);
  };

  return (
    <>
      <h3 className={styles.title}>{getLocalizedText('addNewDoc')}</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField label="Name" name="name" onChange={handleChange} value={data.name} error={errors.name} />
        <TextField label="Surname" name="surname" onChange={handleChange} value={data.surname} error={errors.surname} />
        <TextField label="Photo" name="image" onChange={handleChange} value={data.image} error={errors.image} />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={data.password}
          error={errors.password}
        />
        <TextField label="Email" name="mail" onChange={handleChange} value={data.mail} error={errors.mail} />
        <TextField
          label="User Name"
          name="username"
          onChange={handleChange}
          value={data.username}
          error={errors.username}
        />
        <SelectField
          label="Specialization"
          name="specialization"
          onChange={handleChange}
          value={data.specialization}
          error={errors.specialization}
          defaultOption="Choose"
          options={transformData(specializations)}
          disabledOption
        />
        {createError && <div style={{ color: 'red' }}>{createError}</div>}
        <button className={btnStyle.submit_btn} disabled={!isValid || isDisbale} type="submit">
          {getLocalizedText('submit')}
        </button>
      </form>
    </>
  );
}

export default AddNewDoctorForm;