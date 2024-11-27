import React, { useEffect, useState } from "react";
import { ArrowRight, File } from "lucide-react";
import axios from "axios";

const FileContainer = ({
  id,
  name,
  onClick,
  active,
}) => {
  const[collabs,setCollabs]=useState(0);
  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/api/get-count",
        {
          file_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setCollabs(res.data.collaborator_count);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div onClick={onClick} className="file-container">
      <div className="file-info">
        <div>
          <File color="black" />
          <p>{name}</p>
          {active && <ArrowRight color="black" />}
        </div>
        {collabs > 0 && <em>🧑‍💻{collabs}</em>}
      </div>
      <div className="separator"></div>
    </div>
  );
};

export default FileContainer;
