import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getSpecializations } from '../../store/specializations';
import validator from '../../utils/validator';
import TextField from '../form/TextField';
import SelectField from '../form/SelectedField';
import { TSpec } from '../../types/types';
import { createDoctor } from '../../store/doctors';
import generateAvatar from '../../utils/generateAvatar';
import { getLocalizedText } from '../../services/localizationService';

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
  const specializations = useAppSelector(getSpecializations());

  const validatorConfig = {
    username: {
      isRequired: {
        message: getLocalizedText('errMessage'),
      },
      noSpaces: {
        message: 'add without spaces',
      },
    },
    name: {
      isRequired: {
        message: getLocalizedText('errMessage'),
      },
      noSpaces: {
        message: 'add without spaces',
      },
    },
    surname: {
      isRequired: {
        message: getLocalizedText('errMessage'),
      },
      noSpaces: {
        message: 'add without spaces',
      },
    },
    specialization: {
      isRequired: {
        message: getLocalizedText('errMessage'),
      },
      noSpaces: {
        message: 'add without spaces',
      },
    },
    password: {
      isRequired: {
        message: getLocalizedText('errMessage'),
      },
      noSpaces: {
        message: 'add without spaces',
      },
    },
    mail: {
      isRequired: {
        message: getLocalizedText('errMessage'),
      },
      noSpaces: {
        message: 'add without spaces',
      },
    },
    image: {
      isRequired: {
        message: getLocalizedText('errMessage'),
      },
      isUrl: {
        message: 'Incorrect url',
      },
      noSpaces: {
        message: 'add without spaces',
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidData = validate();
    if (!isValidData) return;

    dispatch(createDoctor(data));
  };

  return (
    <>
      <h3>Add new Doctor</h3>
      <form onSubmit={handleSubmit}>
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
          defaultOption="Choose..."
          options={transformData(specializations)}
        />

        <button disabled={!isValid} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default AddNewDoctorForm;
