import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "./FormInput";
import Button from "./base/Button";
// import { requestLogin } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const { fileId, privilege } = useParams();
  const { loggedin } = useAuth();
  const [empty, setEmpty] = useState(true);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleNav = () => {
    if (fileId && privilege) {
      navigate(`/${fileId}/${privilege}`);
    } else {
      navigate("/");
    }
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
    if(login){
      axios
        .post(
          "http://localhost:8000/api/login",
          {
            email: login.email,
            password: login.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          toast.success(response.data.message + "✅");
          localStorage.setItem("token", response.data.token);
          navigate("/panel");
          if (fileId && privilege) {
            navigate(`/invite/${fileId}/${privilege}`);
          } else {
            navigate("/panel");
          }
          loggedin();
        })
        .catch((e) => toast.error("Error logging in ❌"));
    }else{
      toast.info("You can't send empty forms 😜")
    }
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
