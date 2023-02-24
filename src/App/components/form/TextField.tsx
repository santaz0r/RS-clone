import React, { useState } from 'react';

import styles from './TextField.module.scss';
import { getLocalizedText } from '../../services/localizationService';

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
  // const getInputClasses = () => `default ${error ? ' invalid' : 'valid'}`;
  return (
    <div className={styles.input__wrapper}>
      <label className={styles.input__label} htmlFor={name}>
        {getLocalizedText(label.toLowerCase())}
      </label>
      <div>
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={styles.input}
          // className={getInputClasses()}
        />
        {error && <div className={styles.error}>{error}</div>}
        {type === 'password' && (
          <label htmlFor="chk" className={styles.pass_label}>
            <input type="checkbox" id="chk" onChange={toggleShowPassword} checked={showPassword} />
            {getLocalizedText('showPassword')}
          </label>
        )}
      </div>
    </div>
  );
}
TextField.defaultProps = {
  type: 'text',
};

export default TextField;
