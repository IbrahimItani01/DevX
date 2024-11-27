import { Bug, BugPlay } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AI = ({ script, setScript }) => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const handleClick = () => setClicked(!clicked);

  const generateResponse = (e) => {
    const selectedAction = e.target.textContent;
    toast.info("Generating 🌠");
    const systemMessage =
      selectedAction === "Analyze Code"
        ? "reply according to the programming language based on syntax.You are a code analysis assistant you only give hint in a comment. Provide insights  in the form of comments inside script. return the whole script as it was with the extra comments. if you see no code return the initial comment"
        : "reply according to programming language based on syntax.You are a code fixer assistant you only give hint in a comment. Identify any errors in the code. return the whole script as it was with the extra comments.if you see no code return the initial comment";

    const userMessage = `\n${script}`;
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
        setScript(res.data.choices[0].message.content);
        toast.success("Done Sir 🫡");
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong 🫠");
      });
    setClicked(!clicked);
  };

  return (
    <>
      <div className="ai-button" onClick={handleClick}>
        {!loading ? <BugPlay color="black" /> : <Bug color="black" />}
      </div>
      {clicked && (
        <div className="ai-bubble">
          <p onClick={generateResponse}>👁️ Analyze Code</p>
          <p onClick={generateResponse}>🛠️ Fix Errors</p>
        </div>
      )}
    </>
  );
};

export default AI;
