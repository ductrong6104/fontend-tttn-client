// components/ComboBox.js
import React, { useState } from 'react';

const ComboBox = ({ options, onSelect, className }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (onSelect) {
      onSelect(selectedValue);
    }
  };

  return (
    <div className="">
      <select value={selectedOption} onChange={handleChange} className={className} required>
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
