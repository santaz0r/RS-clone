import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getSpecializations } from '../../store/specializations';
import validator from '../../utils/validator';
import TextField from '../form/TextField';
import SelectField from '../form/SelectedField';
import { TSpec } from '../../types/types';
import { updateDoctor } from '../../store/doctors';
import { getLocalizedText } from '../../services/localizationService';
import styles from './Form.module.scss';
import btnStyle from './FormBtn.module.scss';

type TDoc = {
  docData: {
    name: string;
    password: string;
    specialization: string;
    mail: string;
    username: string;
    image: string;
    surname: string;
    _id: string;
  };
  onClose: () => void;
};
const initialState = {
  name: '',
  password: '',
  specialization: '',
  mail: '',
  image: '',
  surname: '',
};

function EditDoctorForm({ docData, onClose }: TDoc) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    name: docData.name,
    password: docData.password,
    specialization: docData.specialization,
    mail: docData.mail,
    image: docData.image,
    surname: docData.surname,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>(initialState);
  const specializations = useAppSelector(getSpecializations());
  const [isDisbale, setDisable] = useState(false);
  const validatorConfig = {
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
      <h3 className={styles.title}>Edit Doctor</h3>
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

        <button className={btnStyle.submit_btn} disabled={!isValid || isDisbale} type="submit">
          {getLocalizedText('submit')}
        </button>
      </form>
    </>
  );
}

export default EditDoctorForm;