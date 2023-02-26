import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../../hooks';
import validator from '../../../utils/validator';
import TextField from '../../form/TextField';
import { updateSpecialization } from '../../../store/specializations';
import { getLocalizedText } from '../../../services/localizationService';
import btnStyle from '../FormBtn.module.scss';

type TSpec = {
  specData: {
    name: string;
    _id: string;
  };
  onClose: () => void;
};

const initialState = {
  name: '',
};

function EditSpecializationForm({ specData, onClose }: TSpec) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    name: specData.name,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>(initialState);
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
  };

  const handleChange = (target: { name: string; value: string }) => {
    // console.log(target);
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    // console.log(data);
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
      _id: specData._id,
    };
    setDisable(true);
    await dispatch(updateSpecialization(fullData));

    onClose();
  };

  return (
    <>
      <h3>Edit Specialization</h3>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" onChange={handleChange} value={data.name} error={errors.name} />
        <button className={btnStyle.submit_btn} disabled={!isValid || isDisbale} type="submit">
          {getLocalizedText('submit')}
        </button>
      </form>
    </>
  );
}

export default EditSpecializationForm;
