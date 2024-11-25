import { Bug } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AI = ({ script,setScript }) => {
  const [clicked, setClicked] = useState(false);
  const [action, setAction] = useState("");
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const handleClick = () => setClicked(!clicked);
  return (
    <>
      <div className="ai-button" onClick={handleClick}>
        <Bug color="black" />
      </div>
      {clicked && (
        <div className="ai-bubble">
          <p onClick={generateResponse}>Analyze Code</p>
          <p onClick={generateResponse}>Fix Errors</p>
        </div>
      )}
    </>
  );
};

export default AI;
