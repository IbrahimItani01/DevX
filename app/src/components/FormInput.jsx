import React from 'react';
import './../styles/base.css';
const FormInput = ({ label, type, name, placeholder }) => {
  return (
    <div className="flex column">
      <div><label>{label}</label></div>
      <input type={type} name={name} placeholder={placeholder} />
    </div>
  );
};

export default FormInput;
