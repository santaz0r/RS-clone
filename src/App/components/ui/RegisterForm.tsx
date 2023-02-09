import React, { useEffect, useState } from 'react';
import validator from '../../utils/validator';
import TextField from '../form/TextField';

import styles from './LoginForm.module.scss';

type TProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<'register' | 'login'>>;
}

function RegisterForm({ setCurrentModal }: TProps) {
  const [data, setData] = useState({
    userName: '',
    password: '',
    email: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (target: { name: string; value: string }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    userName: {
      isRequired: {
        message: '*user name is required',
      },
    },
    email: {
      isRequired: {
        message: '*email is required',
      },
      isEmail: {
        message: '*email is not correct',
      },
    },
    password: {
      isRequired: {
        message: '*password is required',
      },
      min: {
        message: '*password should be 3 characters minimum',
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Create account</h2>
      <TextField
        label="User name"
        name="userName"
        onChange={handleChange}
        value={data.userName}
        error={errors.userName}
      />
      <TextField label="Email" name="email" onChange={handleChange} value={data.email} error={errors.email} />
      <TextField
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
        value={data.password}
        error={errors.password}
      />
      <button
        disabled={!isValid}
        type="submit"
        className={styles.submit__btn}
      >Submit
      </button>
      <div>
        <button
          type="button"
          onClick={() => setCurrentModal('login')}
          className={styles.changeModal__btn}
        >Already have an account? Login...
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
