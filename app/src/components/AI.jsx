import { Bug } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AI = ({ script,setScript }) => {
  const [clicked, setClicked] = useState(false);
  const [action, setAction] = useState("");
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const handleClick = () => setClicked(!clicked);

  const generateResponse = (e) => {
    const selectedAction = e.target.textContent;
    setAction(selectedAction);

    const systemMessage =
      selectedAction === "Analyze Code"
        ? "You are a code analysis assistant. Provide insights and improvements.only return the code provided itself as a response and add the insights as comments beside each section to improve."
        : "You are a code fixer assistant. Identify and fix any errors in the code. only return the code provided itself as a response and add the fixes as comments beside each section to improve.";

    const userMessage = `Here is the code:\n${script}`;
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4", 
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: userMessage },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`, 
          },
        }
      )
      .then((res) => {
        console.log(res)
        toast.success("Done Sir!")
        // TODO: set script to the response of ai
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong")
      });
      setClicked(!clicked)
  };

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
