import React from 'react'
import { useNavigate } from 'react-router-dom';
import FormInput from './FormInput';

const Login = () => {
    const navigate = useNavigate();
    const handleNav = ()=>{
      navigate("/")
    }
  return (
    <>
    <FormInput label="Email" type="text" name="email" placeholder="Enter your email" />
    <FormInput label="Password" type="password" name="password" placeholder="Enter your password" />

 <button>Sign in</button>
         <p>Don't have an Account? <span onClick={handleNav}>SIGNUP</span></p> 
    </>
  )
}

export default Login
