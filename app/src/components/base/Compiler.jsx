import React, { useRef, useState, useEffect } from "react";
import "../../styles/compiler.css";
import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import InputSection from "./InputSection";
import Output from "./Output";
import { executeCode } from "../../apis/compile";
import useWindowResize from "../../hooks/useWindowsResize";
import { snippets, defaultOutput, defaultLanguage } from "../../constants";

const Compiler = ({ file, updateFileContent }) => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState(defaultOutput);
  const [language, setLanguage] = useState(defaultLanguage);
  const [script, setScript] = useState(file.content || snippets[defaultLanguage]);
  const [userInput, setUserInput] = useState("");

  // Update the local script when the file changes
  useEffect(() => {
    setScript(file.content || snippets[defaultLanguage]);
  }, [file]);

  // Handle Editor Initialization
  const handleMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Resize Handler for Editor
  useWindowResize(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  });

  // Language Selection Handler
  const onSelect = (lang) => {
    setLanguage(lang);
    setScript(snippets[lang]);
  };

  // Code Execution
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      const { run: result } = await executeCode(language, sourceCode, userInput);
      setOutput(result.output);
    } catch (error) {
      console.error(error);
    }
  };

  // Sync script changes with the parent
  const handleScriptChange = (value) => {
    setScript(value);
    if (updateFileContent) {
      updateFileContent(file.id, value);
    }
  };

  return (
    <div className="compiler-section">
      <div className="editor">
        <div className="editor-actions">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Play onClick={runCode} color="black" className="play" />
        </div>
        <Editor
          height="100%"
          theme="vs-dark"
          language={language}
          value={script}
          onMount={handleMount}
          onChange={handleScriptChange}
          options={{
            fontSize: "20px",
          }}
        />
      </div>
      <div className="input-output">
        <InputSection userInput={userInput} setUserInput={setUserInput} />
        <Output output={output} />
      </div>
    </div>
  );
};

export default Compiler;
