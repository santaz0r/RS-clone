import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../hooks';
import { createSpecialization } from '../../../store/specializations';
import validator from '../../../utils/validator';
import TextField from '../../form/TextField';
import { getLocalizedText } from '../../../services/localizationService';
import btnStyle from '../FormBtn.module.scss';

const initialState = {
  name: '',
};

function AddNewSpecializationForm() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>(initialState);

  const validatorConfig = {
    name: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
      noSpaces: {
        message: getLocalizedText('noSpaces'),
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
      <h3>Add new Specialization</h3>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" onChange={handleChange} value={data.name} error={errors.name} />
        <button
          className={btnStyle.submit_btn}
          style={{ height: '25px', fontSize: '16px', margin: 0 }}
          disabled={!isValid}
          type="submit"
        >
          {getLocalizedText('submit')}
        </button>
      </form>
    </>
  );
}

export default AddNewSpecializationForm;
