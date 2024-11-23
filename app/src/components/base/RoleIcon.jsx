import { Eye, Pencil } from "lucide-react";
import React from "react";

const RoleIcon = ({ role, isActive, onClick }) => {
  return (
    <div
      className={`role-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {role === "edit" ? (
        <Pencil className={isActive ? "active" : ""} />
      ) : (
        <Eye className={isActive ? "active" : ""} />
      )}
    </div>
  );
};

export default RoleIcon;
