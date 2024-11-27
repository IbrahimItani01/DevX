import React from 'react';
import './../styles/base.css';
import Input from './base/Input';

const FormInput = ({ label, type, placeholder }) => {
  return (
    <div className="flex column">
      <div><label>{label}</label></div>
      <Input type={type} placeholder={placeholder} />
    </div>
  );
};

export default FormInput;
