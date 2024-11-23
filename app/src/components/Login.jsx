import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import Button from "./base/Button";
import { requestLogin } from "../apis/auth";
const Login = () => {
  const navigate = useNavigate();
  const [empty, setEmpty] = useState(true);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleNav = () => {
    navigate("/");
  };
  const handleChange = (e) => {
    setEmpty(false);
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogin = () => {
    // requestLogin(login)
    console.log(login);
  };
  return (
    <>
      <FormInput
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={login.email}
        onChange={handleChange}
      />
      <FormInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={login.password}
        onChange={handleChange}
      />
      <Button text={"Sign In"} disabled={empty} onClick={handleLogin} />
      <p>
        Don't have an Account? <span onClick={handleNav}>SIGNUP</span>
      </p>
    </>
  );
};

export default Login;
