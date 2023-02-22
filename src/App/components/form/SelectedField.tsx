import React from 'react';
import { TSpec } from '../../types/types';
import { getLocalizedText } from '../../services/localizationService';

type TProps = {
  label: string;
  name: string;
  defaultOption: string;
  options: { label: TSpec['name']; value: TSpec['_id'] }[];
  value: string;
  error: string;
  onChange: (target: { name: string; value: string }) => void;
};

function SelectField({ label, name, value, onChange, defaultOption, options, error }: TProps) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => 'some classes';
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {getLocalizedText(label.toLowerCase())}
      </label>
      <select className={getInputClasses()} id={name} name={name} value={value} onChange={handleChange}>
        <option disabled value="">
          {defaultOption}
        </option>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && (
        <div style={{ color: 'red', fontSize: 14 }} className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
}
export default SelectField;
