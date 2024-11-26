import React, { useContext, useState } from "react";
import RoleIcon from "./RoleIcon";
import "../../styles/invite.css";
import Input from "../base/Input";
import Button from "../base/Button";
import { sendInvite } from "../../apis/sendInvite";
import { Check } from "lucide-react";
import {useParams} from "react-router-dom"
import { userContext } from "../../context/UserContext";
import { toast } from "react-toastify";
const InviteField = () => {
  const {id} = useParams();
  const [activeRole, setActiveRole] = useState(null);
  const{userEmail}=useContext(userContext);

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const handleRoleToggle = (role) => {
    setActiveRole(activeRole === role ? null : role);
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSend = () => {
    if(!activeRole){
      toast.error("Choose privilege 🥸")
    }
    else if(!email){
      toast.error("Fill invitee email 🥸");
    }
    else if(!email && !activeRole){
      toast.info("FYI: you can't send empty invites 😜 ")
    }
    else{
      sendInvite(email,id,activeRole,userEmail)
      setActiveRole(null);
      setEmail("");
      setSent(true);
      setTimeout(() => {
        setSent(false);
      }, 1500);
    }
  };
  return (
    <div className="invite-section">
      <RoleIcon
        role="editor"
        isActive={activeRole === "editor"}
        onClick={() => handleRoleToggle("editor")}
      />
      <RoleIcon
        role="viewer"
        isActive={activeRole === "viewer"}
        onClick={() => handleRoleToggle("viewer")}
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
