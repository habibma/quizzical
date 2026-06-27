import { useState } from "react";

const Input = ({ type ,value, onChange }) => {

  return (
    <div>
      <input
        type={type || "text"}
        placeholder="Enter your answer..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;