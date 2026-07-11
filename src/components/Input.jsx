
const Input = ({ type = "text", value, onChange, label, name, id, radioValue, required, ...rest }) => {
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

  return (
    <div>
      <input {...inputProps} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;