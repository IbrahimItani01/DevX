import React from "react";

const Input = ({ name, placeholder, type,value,onChange }) => {
  return <input name={name} onChange={onChange} placeholder={placeholder} type={type} value={value} />;
};

export default Input;
