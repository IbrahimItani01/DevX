import React from "react";
import "./../../styles/button.css";


const Button = ({ text, onClick }) => {
  return (
    <button className="base-button" onClick={() => onClick()}>
      {text}
    </button>
  );
};

export default Button;
