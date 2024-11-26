import React, { useEffect, useRef, useState } from "react";
import "../../styles/compiler.css";
import Editor from "@monaco-editor/react";
import { Pause, Play } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import InputSection from "./InputSection";
import Output from "./Output";
import { executeCode } from "../../apis/compile";
import useWindowResize from "../../hooks/useWindowsResize";
import { snippets, defaultOutput, defaultLanguage } from "../../constants";
import { toast } from "react-toastify";
import AI from "../AI";

const Compiler = ({ file, saveContent }) => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState(defaultOutput);
  const [language, setLanguage] = useState(defaultLanguage);
  const [script, setScript] = useState(
    file.content || snippets[defaultLanguage]
  );
  const [userInput, setUserInput] = useState("");

  // Handle Save Shortcut
  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      const sourceCode = editorRef.current.getValue();
      saveContent(file.id, sourceCode);
      setScript(sourceCode); // Update script to reflect the saved content
      toast.success("File saved successfully!");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleSaveShortcut);
    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, []);

  // Update Editor Content When File Changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(file.content || snippets[language]);
    }
  }, [language]);

  // Resize Handler for Editor
  useWindowResize(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  });

  // Code Execution
  const runCode = async () => {
    toast.info("compiling your script :)");
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      const { run: result } = await executeCode(
        language,
        sourceCode,
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
          <LanguageSelector language={language} onSelect={setLanguage} />
          <Play onClick={runCode} color="black" className="play" />
        </div>
        <Editor
          height="100%"
          theme="vs-dark"
          language={language}
          value={script}
          onMount={(editor) => (editorRef.current = editor)}
          onChange={(value) => setScript(value)}
          options={{
            fontSize: "20px",
          }}
        />
        <AI script={script} setScript={setScript}/>
      </div>
      <div className="input-output">
        <InputSection userInput={userInput} setUserInput={setUserInput} />
        <Output output={output} />
      </div>
    </div>
  );
};

export default Compiler;
