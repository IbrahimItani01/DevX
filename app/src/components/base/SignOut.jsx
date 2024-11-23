import { LogOut } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
const SignOut = () => {
    const navigate = useNavigate();
    const handleSignOut = ()=>{
        localStorage.clear();
        navigate("/login");

    }
  return (
    <LogOut onClick={handleSignOut} color='black'/>
  )
}

export default SignOut
