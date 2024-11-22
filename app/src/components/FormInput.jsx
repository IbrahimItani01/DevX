import React from 'react';

const FormInput = ({ label, type, name }) => {
  return (
    <div>
      <div><label>{label}</label></div>
      <input type={type} name={name} />
    </div>
  );
};

export default FormInput;
