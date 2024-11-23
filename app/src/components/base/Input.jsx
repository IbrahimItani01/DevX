import React from "react";

const Input = ({ placeholder, type,value=null,onChange }) => {
  return <input onChange={onChange} placeholder={placeholder} type={type} value={value} />;
};

export default Input;
