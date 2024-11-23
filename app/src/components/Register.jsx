import React, { useState } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import Button from "./base/Button";
import { requestRegister } from "../apis/auth";

const Register = () => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate("/login");
  };
  const [empty, setEmpty] = useState(true);
  const [register, setRegister] = useState({
    email: "",
    name: "",
    password: "",
    confirm: "",
  });
  const handleChange = (e) => {
    setEmpty(false);
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRegister = () => {
    // requestRegister(register)
    console.log(register)
  };
  return (
    <>
      <div className="row flex justify-center">
        <FormInput
          onChange={handleChange}
          value={register.name}
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
        />
        <FormInput
          onChange={handleChange}
          value={register.email}
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>

      <div className="row flex justify-center">
        <FormInput
          onChange={handleChange}
          value={register.password}
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <FormInput
          onChange={handleChange}
          value={register.confirm}
          label="Confirm Password"
          type="password"
          name="confirm"
          placeholder="Confirm your password"
        />
      </div>
      <Button text={"Sign Up"} disabled={empty} onClick={handleRegister} />
      <p>
        Have an Account? <span onClick={handleNav}>LOGIN</span>
      </p>
    </>
  );
};

export default Register;
