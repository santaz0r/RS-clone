import React, { useState, useEffect } from 'react';
import TextField from '../form/TextField';
import validator from '../../utils/validator';

function LoginForm() {
  const [data, setData] = useState({
    userName: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    userName: '',
    password: '',
  });
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
    password: {
      isRequired: {
        message: 'Password is required field',
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

export default LoginForm;
