import React, { useState, useEffect } from 'react';
import TextField from '../form/TextField';
import validator from '../../utils/validator';

import styles from './LoginForm.module.scss';
import btnStyle from './FormBtn.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthErrors, login } from '../../store/users';
import { getLang } from '../../store/language';
import { locText } from '../../services/locText';

type TProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<'register' | 'login'>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginForm({ setCurrentModal, setActive }: TProps) {
  const dispatch = useAppDispatch();
  const currentLang = useAppSelector(getLang());
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    username: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const loginError = useAppSelector(getAuthErrors());
  const handleChange = (target: { name: string; value: string }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const validatorConfig = {
    username: {
      isRequired: {
        message: 'isRequired',
      },
    },
    password: {
      isRequired: {
        message: 'isRequired',
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
    await dispatch(login({ data, setModal: setActive }));

    setIsDisabled(false);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>{locText('login', currentLang)}</h2>
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
      <button disabled={!isValid || isDisabled} type="submit" className={btnStyle.submit_btn}>
        {isDisabled ? 'waiting' : 'Submit'}
      </button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      <div>
        <button type="button" onClick={() => setCurrentModal('register')} className={styles.changeModal__btn}>
          {locText('switchToRegister', currentLang)}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
