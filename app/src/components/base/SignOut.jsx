import { LogOut } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const SignOut = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
    logout();
  };
  return <LogOut onClick={handleSignOut} color="black" />;
};

export default SignOut;
