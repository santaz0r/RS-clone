import React, { useState } from 'react';

import styles from './TextField.module.scss';
import { useAppSelector } from '../../../hooks';
import { getLang } from '../../store/language';
import { locText } from '../../services/locText';

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
  const currentLang = useAppSelector(getLang());
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: target.name, value: target.value });
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.input__wrapper}>
      <label className={styles.input__label} htmlFor={name}>
        {locText(label.toLowerCase(), currentLang)}
      </label>
      <div>
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={styles.input}
        />
        {error && <div className={styles.error}>{locText(error, currentLang)}</div>}
        {type === 'password' && (
          <label htmlFor="chk" className={styles.pass_label}>
            <input type="checkbox" id="chk" onChange={toggleShowPassword} checked={showPassword} />
            {locText('showPassword', currentLang)}
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
