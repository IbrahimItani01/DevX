import React from "react";
import { ArrowRight, File } from "lucide-react";

const FileContainer = ({ name, collabs = 0, onClick, active }) => {
  return (
    <div onClick={onClick} className="file-container">
      <div className="file-info">
        <div>
          <File color="black" />
          <p>{name}</p>
          {active && <ArrowRight color="black" />} {/* Show arrow if active */}
        </div>
        {collabs > 0 && <em>{collabs}</em>}
      </div>
      <div className="separator"></div>
    </div>
  );
};

export default FileContainer;
