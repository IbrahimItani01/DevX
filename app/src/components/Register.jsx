import React from 'react'
import FormInput from './FormInput'
import { useNavigate } from 'react-router-dom';
import Button from './base/Button';

const Register = () => {
    const navigate = useNavigate();
    const handleNav = ()=>{
      navigate("/login")
    }
  return (
   <>
    <div className='row flex justify-center'>
        <FormInput label="Name" type="text" name="text" placeholder="Enter your name" />
        <FormInput label="Email" type="text" name="email" placeholder="Enter your email" />
      </div>

      <div className='row flex justify-center'>
        <FormInput label="Password" type="password" name="password" placeholder="Enter your password" />
        <FormInput label="Confirm Password" type="password" name="text" placeholder="Confirm your password" />
      </div>
      <div><Button text="Sign up" /></div>
      <p>Have an Account? <span onClick={handleNav}>LOGIN</span></p>
   </>
  )
}

export default Register
