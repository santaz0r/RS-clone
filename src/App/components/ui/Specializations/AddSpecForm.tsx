import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { createSpecialization, getErrors } from '../../../store/specializations';
import validator from '../../../utils/validator';
import TextField from '../../form/TextField';
import btnStyle from '../FormBtn.module.scss';
import { getLang } from '../../../store/language';
import { locText } from '../../../services/locText';

const initialState = {
  name: '',
};

function AddNewSpecializationForm() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>(initialState);
  const specError = useAppSelector(getErrors());
  const currentLang = useAppSelector(getLang());

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'isRequired',
      },
      noSpaces: {
        message: 'noSpaces',
      },
    },
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

    dispatch(createSpecialization(data));
  };

  return (
    <>
      <h3>{locText('addNewSpec', currentLang)}</h3>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" onChange={handleChange} value={data.name} error={errors.name} />
        {specError && <div style={{ color: 'red' }}>{specError}</div>}
        <button
          className={btnStyle.submit_btn}
          style={{ height: '25px', fontSize: '16px', margin: 0 }}
          disabled={!isValid}
          type="submit"
        >
          {locText('submit', currentLang)}
        </button>
      </form>
    </>
  );
}

export default AddNewSpecializationForm;
