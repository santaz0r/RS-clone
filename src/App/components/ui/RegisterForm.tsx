import React, { useEffect, useState } from 'react';
import validator from '../../utils/validator';
import TextField from '../form/TextField';

import styles from './LoginForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthErrors, signUp } from '../../store/users';
import { getLocalizedText } from '../../services/localizationService';

type TProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<'register' | 'login'>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function RegisterForm({ setCurrentModal, setActive }: TProps) {
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    username: '',
    name: '',
    password: '',
    mail: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const registerError = useAppSelector(getAuthErrors());

  const [isDisabled, setIsDisabled] = useState(false);
  const handleChange = (target: { name: string; value: string }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
    },
    username: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
    },
    mail: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
      isEmail: {
        message: getLocalizedText('isEmail'),
      },
    },
    password: {
      isRequired: {
        message: getLocalizedText('isRequired'),
      },
      min: {
        message: getLocalizedText('passMin'),
        value: '3',
      },
    },
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
    const isValidForm = validate();
    if (!isValidForm) return;
    setIsDisabled(true);
    await dispatch(signUp(data, setActive));
    setIsDisabled(false);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Create account</h2>
      <TextField
        label="User name"
        name="username"
        onChange={handleChange}
        value={data.username}
        error={errors.username}
      />
      <TextField label="Name" name="name" onChange={handleChange} value={data.name} error={errors.name} />
      <TextField label="Email" name="mail" onChange={handleChange} value={data.mail} error={errors.mail} />
      <TextField
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
        value={data.password}
        error={errors.password}
      />
      <button disabled={!isValid || isDisabled} type="submit" className={styles.submit__btn}>
        {isDisabled ? 'waiting' : 'Submit'}
      </button>
      {registerError && <p>{registerError}</p>}
      <div>
        <button type="button" onClick={() => setCurrentModal('login')} className={styles.changeModal__btn}>
          Already have an account? Login...
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
