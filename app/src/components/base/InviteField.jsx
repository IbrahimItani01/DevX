import React, { useState } from "react";
import RoleIcon from "./RoleIcon";
import "../../styles/invite.css";
import Input from "../base/Input";
import Button from "../base/Button";
import { sendInvite } from "../../apis/sendInvite";
import { Check } from "lucide-react";

const InviteField = () => {
  const [activeRole, setActiveRole] = useState(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const handleRoleToggle = (role) => {
    setActiveRole(activeRole === role ? null : role);
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className='invite-section'>
      <RoleIcon role={"edit"}/>
      <RoleIcon role={"view"}/>
      <Input type='email' placeholder='Invitee Email ...'></Input>
      <Button text={"Invite"}/>
    </div>
  )
}

export default InviteField
