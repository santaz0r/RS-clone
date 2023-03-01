import React from 'react';
import { TSpec } from '../../types/types';
import styles from './SelectField.module.scss';
import { useAppSelector } from '../../../hooks';
import { getLang } from '../../store/language';
import { locText } from '../../services/locText';

type TProps = {
  label: string;
  name: string;
  defaultOption: string;
  options: { label: TSpec['name']; value: TSpec['_id'] }[];
  value: string;
  error: string;
  onChange: (target: { name: string; value: string }) => void;
  disabledOption: boolean;
};

function SelectField({ label, name, value, onChange, defaultOption, options, error, disabledOption }: TProps) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ name: target.name, value: target.value });
  };
  const currentLang = useAppSelector(getLang());
  return (
    <div>
      <label htmlFor={name} className={styles.input__label}>
        {locText(label.toLowerCase(), currentLang)}
      </label>
      <div className={styles.my_select}>
        {options.length ? (
          <>
            <select className={styles.select} id={name} name={name} value={value} onChange={handleChange}>
              <option disabled={disabledOption} value="DEFAULT" key="DEFAULT">
                {locText(defaultOption.toLowerCase(), currentLang)}
              </option>
              {options &&
                options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
            <span className={styles.arrow} />
          </>
        ) : (
          <p>{locText('occupied', currentLang)}</p>
        )}
      </div>
      {error && <div className={styles.error}>{locText(error, currentLang)}</div>}
    </div>
  );
}
export default SelectField;
