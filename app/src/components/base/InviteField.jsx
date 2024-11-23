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
  const handleSend = () => {
    // sendInvite(email)
    console.log(email);
    console.log(activeRole);
    setActiveRole(null);
    setEmail("");
    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 1500);
  };
  return (
    <div className="invite-section">
      <RoleIcon
        role="edit"
        isActive={activeRole === "edit"}
        onClick={() => handleRoleToggle("edit")}
      />
      <RoleIcon
        role="view"
        isActive={activeRole === "view"}
        onClick={() => handleRoleToggle("view")}
      />
      <Input
        onChange={handleChange}
        value={email}
        type="email"
        placeholder="Invitee Email ..."
      />
      {sent ? (
        <Check width={50} />
      ) : (
        <Button
          onClick={handleSend}
          text={"Invite"}
          disabled={email === "" ? true : false}
        />
      )}
    </div>
  );
};

export default InviteField;
