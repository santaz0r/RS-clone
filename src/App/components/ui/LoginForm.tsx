import React, { useState, useEffect } from 'react';
import TextField from '../form/TextField';
import validator from '../../utils/validator';

import styles from './LoginForm.module.scss';
import { useAppDispatch } from '../../../hooks';
import { login } from '../../store/usersStore';

type TProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<'register' | 'login'>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginForm({ setCurrentModal, setActive }: TProps) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    username: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const handleChange = (target: { name: string; value: string }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    username: {
      isRequired: {
        message: '*user name is required',
      },
    },
    password: {
      isRequired: {
        message: '*password is required',
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
    console.log(data);
    await dispatch(login(data));
    setIsDisabled(false);
    setActive(false);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Login</h2>
      <TextField
        label="User name"
        name="username"
        onChange={handleChange}
        value={data.username}
        error={errors.username}
      />
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
      <div>
        <button type="button" onClick={() => setCurrentModal('register')} className={styles.changeModal__btn}>
          Not registered? Create an account...
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
