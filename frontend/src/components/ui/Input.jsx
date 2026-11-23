import React from 'react';

import './Input.css';

const Input = ({ as = "input", options = [], type = "text", value, onChange, label, name, id, radioValue, required, error, ...rest }) => {
  const inputProps = {
    type,
    id,
    name,
    onChange,
    required,
    ...rest,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? `${id}-error` : rest['aria-describedby'],
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
        {error && <span className="input-error" id={`${id}-error`} role="alert">{error}</span>}
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
      {error && <span className="input-error" id={`${id}-error`} role="alert">{error}</span>}
    </div>
  );
};

export default Input;