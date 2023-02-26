import React from 'react';
import { TSpec } from '../../types/types';
import { getLocalizedText } from '../../services/localizationService';
import styles from './SelectField.module.scss';

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
  // const getInputClasses = () => 'some classes';
  return (
    <div>
      <label htmlFor={name} className={styles.input__label}>
        {getLocalizedText(label.toLowerCase())}
      </label>
      <div className={styles.my_select}>
        {options.length ? (
          <>
            <select className={styles.select} id={name} name={name} value={value} onChange={handleChange}>
              <option disabled={disabledOption} value="DEFAULT" key="DEFAULT">
                {getLocalizedText(defaultOption.toLowerCase())}
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
          <p>{getLocalizedText('occupied')}</p>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
export default SelectField;
