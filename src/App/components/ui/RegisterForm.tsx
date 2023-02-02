import React, { useEffect, useState } from 'react';
import validator from '../../utils/validator';
import TextField from '../form/TextField';

function RegisterForm() {
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
        message: 'User name is required field',
      },
    },
    email: {
      isRequired: {
        message: 'Email is required field',
      },
      isEmail: {
        message: 'Email is not correct',
      },
    },
    password: {
      isRequired: {
        message: 'Password is required field',
      },
      min: {
        message: 'The password should be a minimum of 3 characters.',
        value: 3,
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
    <form onSubmit={handleSubmit}>
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
      <button disabled={!isValid} type="submit">
        Submit
      </button>
    </form>
  );
}

export default RegisterForm;
