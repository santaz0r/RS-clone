import React, { useState } from 'react';

type TProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  error: string;
  onChange: (target: { name: string; value: string }) => void;
};

function TextField({ label, type, name, value, onChange, error }: TProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: target.name, value: target.value });
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const getInputClasses = () => `default ${error ? ' invalid' : 'valid'}`;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {type === 'password' && (
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? 'hide password' : 'show password'}
          </button>
        )}
        {error && <div className="has-error">{error}</div>}
      </div>
    </div>
  );
}
TextField.defaultProps = {
  type: 'text',
};

export default TextField;
