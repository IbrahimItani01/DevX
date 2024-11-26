import React, { useContext, useEffect, useRef, useState } from "react";
import "../../styles/compiler.css";
import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import InputSection from "./InputSection";
import Output from "./Output";
import { executeCode } from "../../apis/compile";
import useWindowResize from "../../hooks/useWindowsResize";
import { snippets, defaultOutput } from "../../constants";
import { toast } from "react-toastify";
import AI from "../AI";
import { filesContext } from "../../context/FilesContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const Compiler = ({ saveContent }) => {
  const { id } = useParams();
  const { filesData } = useContext(filesContext);

  const [fileData, setFileData] = useState({
  });
  const editorRef = useRef(null);

  const [output, setOutput] = useState(defaultOutput);

  const [script, setScript] = useState(null);

  const [userInput, setUserInput] = useState("");
  useEffect(() => {
    console.log("Fetching file content for id:", id);
    axios
      .post("http://localhost:8000/api/getFileContent", { file_id: id })
      .then((res) => {
        setScript(res.data.content);
  
        if (filesData && filesData.length > 0) {
          for (const file of filesData) {
            if (file.id == id) {
              console.log("File found:", file);
              setFileData({
                name: file.file_name,
                language: file.file_language,
              });
            }
          }
        } else {
          console.warn("filesData is empty or not ready.");
        }
      });
  }, [filesData, id]); // Dependency array ensures updates when filesData or id changes
  

  // Handle Save Shortcut
  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      // const sourceCode = editorRef.current.getValue();
      // console.log(sourceCode)
      saveContent(id, script, fileData.file_name, fileData.file_language);
      setScript(script);
      toast.success("File saved successfully!");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleSaveShortcut);
    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, []);

  // useEffect(() => {
  //   if (editorRef.current) {
  //     editorRef.current.setValue(codeData || snippets[language]);
  //   }
  // }, [fileData.language]);

  // Resize Handler for Editor
  useWindowResize(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  });

  // Code Execution
  const runCode = async () => {
    toast.info("compiling your script :)");
    if (!script) return;

    try {
      const { run: result } = await executeCode(
        fileData.language,
        script,
        userInput
      );
      setOutput(result.output);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="compiler-section">
      <div className="editor">
        <div className="editor-actions">
          <LanguageSelector
            language={fileData.file_language}
            setFileData={setFileData}
          />
          <Play onClick={runCode} color="black" className="play" />
        </div>
        <Editor
          height="100%"
          theme="vs-dark"
          language={fileData.file_language}
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
