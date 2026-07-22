import React from 'react';

import './Input.css';

const Input = ({ as = "input", options = [], type = "text", value, onChange, label, name, id, radioValue, required, ...rest }) => {
  const inputProps = {
    type,
    id,
    name,
    onChange,
    required,
    ...rest,
  };

  if (type === "radio") {
    inputProps.value = radioValue;
    inputProps.checked = value === radioValue;
  } else {
    inputProps.value = value;
  }

  if (as === "select") {
    inputProps.children = options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));

    return (
      <select {...inputProps}>
        {inputProps.children}
      </select>
    );
  }

  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <input {...inputProps} />
    </div>
  );
};

export default Input;