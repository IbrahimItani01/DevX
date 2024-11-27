import React, { useContext, useEffect, useRef, useState } from "react";
import "../../styles/compiler.css";
import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import InputSection from "./InputSection";
import Output from "./Output";
import { executeCode } from "../../apis/compile";
import useWindowResize from "../../hooks/useWindowsResize";
import { defaultOutput } from "../../constants";
import { toast } from "react-toastify";
import AI from "../AI";
import { filesContext } from "../../context/FilesContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import echo from "../../utils/echo";
import { userContext } from "../../context/UserContext";
import echo from "../../utils/echo";
import { userContext } from "../../context/UserContext";

const Compiler = ({ saveContent }) => {
  const { id: documentId } = useParams();
  const { filesData } = useContext(filesContext);
  const { userId } = useContext(userContext);

  // Initialize fileData with defaults
  const [fileData, setFileData] = useState({
    name: "",
    language: "javascript",
  });
  const editorRef = useRef(null);

  const [output, setOutput] = useState(defaultOutput);

  const [script, setScript] = useState(null);

  const [userInput, setUserInput] = useState("");

  const editorRef = useRef(null);
  let isLocalChange = false; // Prevents feedback loop

  // Fetch file content and metadata
  useEffect(() => {
    if (filesData && documentId) {
      const selectedFile = filesData.find((file) => file.id == documentId);
      if (selectedFile) {
        setFileData({
          name: selectedFile.file_name,
          language: selectedFile.file_language,
        });
      }
    }
  }, [filesData, id]);

  // Fetch file content when component loads or id changes
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/getFileContent", { file_id: id })
      .then((res) => {
        setScript(res.data.content);
      })
      .catch((error) => {
        console.error("Failed to fetch file content:", error);
        toast.error("Could not load file content 🚨");
      });
  }, [id]);

  // Handle Save Shortcut
  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      const sourceCode = editorRef.current.getValue();
      saveContent(id, sourceCode, fileData.name, fileData.language);
      setScript(sourceCode);
      toast.success("File saved successfully 👏");
    }
  };

  // Add and clean up save shortcut listener
  useEffect(() => {
    document.addEventListener("keydown", handleSaveShortcut);
    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [id, fileData, saveContent]);

  // Update editor content when script or fileData.language changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(script || snippets[fileData.language] || "");
    }
  }, [fileData.language]);

  // Resize Handler for Editor
  useWindowResize(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  });

  // Code Execution
  const runCode = async () => {
    toast.info("Compiling your script 🔥");
    if (!script) return;

    try {
      const { run: result } = await executeCode(
        fileData.language,
        script,
        userInput
      );
      setOutput(result.output);
    } catch (error) {
      console.error("Error executing code:", error);
      toast.error("Failed to execute code 😿");
    }
  };

  return (
    <div className="compiler-section">
      <div className="editor">
        <div className="editor-actions">
          <LanguageSelector
            language={fileData.language}
            setFileData={setFileData}
          />
          <Play onClick={runCode} color="black" className="play" />
        </div>
        <Editor
          height="100%"
          theme="vs-dark"
          language={fileData.language}
          value={script}
          onMount={(editor) => (editorRef.current = editor)}
          onChange={(value) => setScript(value)}
          options={{
            fontSize: "20px",
          }}
        />
        <AI script={script} setScript={setScript} />
      </div>
      <div className="input-output">
        <InputSection userInput={userInput} setUserInput={setUserInput} />
        <Output output={output} />
      </div>
    </div>
  );
};

export default Compiler;
