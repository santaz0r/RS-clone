import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getSpecializations } from '../../store/specializations';
import validator from '../../utils/validator';
import TextField from '../form/TextField';
import SelectField from '../form/SelectedField';
import { TSpec } from '../../types/types';
import { updateDoctor } from '../../store/doctors';

type TDoc = {
  docData: {
    name: string;
    password: string;
    specialization: string;
    mail: string;
    username: string;
    _id: string;
  };
  onClose: () => void;
};
const initialState = {
  name: '',
  password: '',
  specialization: '',
  mail: '',
};

function EditDoctorForm({ docData, onClose }: TDoc) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    name: docData.name,
    password: docData.password,
    specialization: docData.specialization,
    mail: docData.mail,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>(initialState);
  const specializations = useAppSelector(getSpecializations());
  const [isDisbale, setDisable] = useState(false);
  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Name is required',
      },
      noSpaces: {
        message: 'add without spaces',
      },
    },
    specialization: {
      isRequired: {
        message: 'Choose the specialization',
      },
      noSpaces: {
        message: 'add without spaces',
      },
    },
    password: {
      isRequired: {
        message: 'Enter password',
      },
      noSpaces: {
        message: 'add without spaces',
      },
    },
    mail: {
      isRequired: {
        message: 'Enter email',
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidData = validate();
    if (!isValidData) return;
    const fullData = {
      ...data,
      _id: docData._id,
      username: docData.username,
    };
    setDisable(true);
    await dispatch(updateDoctor(fullData));

    onClose();
  };

  return (
    <>
      <h3>Edit Doctor</h3>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" onChange={handleChange} value={data.name} error={errors.name} />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={data.password}
          error={errors.password}
        />
        <TextField label="Email" name="mail" onChange={handleChange} value={data.mail} error={errors.mail} />
        <SelectField
          label="Specialization"
          name="specialization"
          onChange={handleChange}
          value={data.specialization}
          error={errors.specialization}
          defaultOption="Choose..."
          options={transformData(specializations)}
        />

        <button disabled={!isValid || isDisbale} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default EditDoctorForm;
