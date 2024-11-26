import React, { useState } from "react";
import FormInput from "./FormInput";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./base/Button";
// import { requestRegister } from "../apis/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const {fileId,privilege}=useParams();

  const handleNav = () => {
    if(fileId&&privilege){
    navigate(`/login/${fileId}/${privilege}`);
    }else{
      navigate("/login");

    }
  };
  const {loggedin}=useAuth();

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
    if (register) {
      if (register.password === register.confirm) {
        axios
          .post(
            "http://localhost:8000/api/register",
            {
              name: register.name,
              email: register.email,
              password: register.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            if(fileId&&privilege){
              navigate(`/invite/${fileId}/${privilege}`)
            }
            else{
              navigate("/panel")
              loggedin();
              toast.success(response.data.message);
            }
          })
          .catch((e) => toast.error(e.response.data.message));
      } else {
        toast.info("Passwords must match!");
      }
    }
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
          placeholder="Min: 8 characters!"
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
