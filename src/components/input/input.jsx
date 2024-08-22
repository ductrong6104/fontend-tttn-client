// components/Input.js
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
// InputCustome được bao bọc bằng forwardRef để có thể nhận ref từ parent component và gán nó cho thẻ <input>.
const InputCustome = forwardRef(({ type, name, value, onChange, placeholder, className, required, readOnly = false }, ref) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border-2 p-2 rounded-md ${className}`}
      required={required}
      ref={ref}
      readOnly={readOnly}
    />
  );
});

InputCustome.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};


export default InputCustome;
