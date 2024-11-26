import React, { useState } from "react";
import "../styles/invitePage.css";
import logo from "../logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./base/Button";
import { toast } from "react-toastify";
import axios from "axios";
const InvitePage = () => {
  const { fileId, privilege } = useParams();
  const navigate = useNavigate();
  const [decide, setDecide] = useState(false);
  const handleAcceptInvite = () => {
    const token = localStorage.token;
    if (token) {
      axios.post("http://localhost:8000/api/create-collab",{
        file_id:fileId,
        privilege
      },{
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.token}`
        }
      }).then((res)=>{
        toast.success("Invite Accepted, you can close tab now :)");
        setTimeout(()=>{
          navigate("/login");
        },1500)
      }).catch((e)=>{
        toast.error("Something went wrong :(");
      })
      setDecide(true);
    } else {
      navigate(`/login/${fileId}/${privilege}`);
    }
  };
  const handleDecline = () => {
    setDecide(true);
    toast.info("Invite Declined, you can close tab now :)");
  };
  return (
    <div className="invite-page">
      <div className="invite-title">
        <img src={logo} width={60} alt=""></img>
        <h1>{!decide ? "Hello Developer!" : "See Ya !"}</h1>
      </div>
      {!decide && (
        <>
          <p>
            You are invited to file {fileId} as: {privilege}
          </p>
          <div className="invite-buttons">
            <Button text={"Decline Invite"} onClick={handleDecline} />
            <Button text={"Accept Invite"} onClick={handleAcceptInvite} />
          </div>
        </>
      )}
    </div>
  );
};

export default InvitePage;
