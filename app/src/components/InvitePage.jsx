import React, { useState } from "react";
import "../styles/invitePage.css";
import logo from "../logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./base/Button";
import { toast } from "react-toastify";
const InvitePage = () => {
  const { fileId, privilege } = useParams();
  const navigate = useNavigate();
  const [decide, setDecide] = useState(false);
  const handleAcceptInvite = () => {
    const token = localStorage.token;
    if (token) {
      // TODO: implement api
      toast.success("Invite Accepted, you can close tab now :)");
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
            <Button text={"Accept Invite"} onClick={handleAcceptInvite} />
            <Button text={"Decline Invite"} onClick={handleDecline} />
          </div>
        </>
      )}
    </div>
  );
};

export default InvitePage;
