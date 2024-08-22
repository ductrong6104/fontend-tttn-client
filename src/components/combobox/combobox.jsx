// components/ComboBox.js
import React, { useState } from 'react';

const ComboBox = ({ options, onSelect, className, required = true, value = ''}) => {
  const [selectedOption, setSelectedOption] = useState(value);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (onSelect) {
      onSelect(selectedValue);
    }
  };

  return (
    <div className="">
      <select value={selectedOption} onChange={handleChange} className={className} required={required}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;
