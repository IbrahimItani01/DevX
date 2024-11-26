import React from "react";


const Button = ({ text, onClick,disabled=false }) => {
  return (
    <button className="base-button" onClick={() => onClick()} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
