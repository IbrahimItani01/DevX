import React from "react";
import "./../styles/base.css";
import Input from "./base/Input";

const FormInput = ({ name, label, type, placeholder, onChange, value }) => {
  return (
    <div className="flex column">
      <div>
        <label>{label}</label>
      </div>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
