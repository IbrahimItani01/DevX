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

const Compiler = ({ saveContent }) => {
  const { id: documentId } = useParams();
  const { filesData } = useContext(filesContext);
  const { userId } = useContext(userContext);
  const [fileData, setFileData] = useState({
    name: "",
    language: "javascript",
    privilege: "owner", // Default privilege
  });
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
          privilege: selectedFile.privilege,
        });
      }

      axios
        .post("http://localhost:8000/api/getFileContent", { file_id: documentId })
        .then((res) => setScript(res.data.content))
        .catch((error) => {
          toast.error("Could not load file content 🚨");
        });
    }
  }, [filesData, documentId]);

  // Laravel Echo for real-time collaboration
  useEffect(() => {
    const channel = echo.channel(`document-${documentId}`);
    channel.listen(".message-sent", (event) => {
      if (event.userId !== userId) {
        applyRemoteChanges(event.content, event.cursorPosition);
      }
    });

    return () => {
      echo.leaveChannel(`document-${documentId}`);
    };
  }, [documentId, userId]);

  // Handle Save Shortcut
  useEffect(() => {
    const handleSaveShortcut = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        if (editorRef.current) {
          const sourceCode = editorRef.current.getValue();
          saveContent(documentId, sourceCode, fileData.name, fileData.language);
          setScript(sourceCode);
          toast.success("File saved successfully 👏");
        }
      }
    };

    document.addEventListener("keydown", handleSaveShortcut);
    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [documentId, fileData, saveContent]);

  // Apply remote changes to the editor
  const applyRemoteChanges = (newContent, cursorPosition) => {
    if (editorRef.current) {
      const editorInstance = editorRef.current;

      if (editorInstance.getValue() !== newContent) {
        setScript(newContent);
        isLocalChange = true; // Suppress local change event
        editorInstance.setValue(newContent);
        if (cursorPosition) {
          editorInstance.setPosition(cursorPosition);
        }
      }
    }
  };

  // Send updates to the server
  const sendUpdate = (newContent, cursorPosition) => {
    fetch("http://localhost:8000/api/update-document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        documentId,
        content: newContent,
        cursorPosition,
      }),
    });
  };

  // Mount the editor and attach local change listener
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    // Disable editing if user is a viewer
    if (fileData.privilege === "viewer") {
      editor.onKeyDown((e) => {
        e.preventDefault();
        toast.error("You do not have permission to edit this document 🚫");
      });
    }

    editor.onDidChangeModelContent(() => {
      if (!isLocalChange) {
        const newContent = editor.getValue();
        const cursorPosition = editor.getPosition();
        sendUpdate(newContent, cursorPosition);
      }
      isLocalChange = false; // Reset flag
    });
  };

  // Resize the editor when the window resizes
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
          onMount={handleEditorDidMount} // Set up editor instance and listeners
          options={{
            fontSize: "20px",
            readOnly: fileData.privilege === "viewer", // Make editor read-only for viewers
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
