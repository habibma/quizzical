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
      <div className="input-container">
        <label className="label" htmlFor={id}>{label}</label>
        <select {...inputProps}>
          {inputProps.children}
        </select>
      </div>
    );
  }

  // for css purposes
  if (type === "radio") {
    return (
      <div className="input-container">
        <input className="input" {...inputProps} />
        <label className="label" htmlFor={id}>{label}</label>
      </div>
    );
  }

  return (
    <div className="input-container">
      <label className="label" htmlFor={id}>{label}</label>
      <input className="input" {...inputProps} />
    </div>
  );
};

export default Input;