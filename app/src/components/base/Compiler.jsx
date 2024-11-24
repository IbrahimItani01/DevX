import React, {useRef, useState } from "react";
import "../../styles/compiler.css";
import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import InputSection from "./InputSection";
import Output from "./Output";
import { executeCode } from "../../apis/compile";
import { toast } from "react-toastify";
import useWindowResize from "../../hooks/useWindowsResize";
import { snippets, defaultOutput, defaultLanguage } from "../../constants";

const Compiler = () => {
  const editorRef = useRef(null);
const [output, setOutput] = useState(defaultOutput);
  const [language, setLanguage] = useState(defaultLanguage);
  const [script, setScript] = useState(snippets[defaultLanguage]);
  const [userInput, setUserInput] = useState("");

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
      toast("An error occurred");
      console.error(error);
    }
  };

  return (
    <div className="compiler-section">
      <div className="editor">
        <div className="editor-actions">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Play color="black" className="play" />
        </div>
        <Editor
          height="95vh"
          theme="vs-dark"
          language={language}
          defaultValue="// Life is short, write code"
          onMount={handleMount}
          value={script}
          onChange={(value) => setScript(value)}
        />
      </div>
      <div className="input-output">
        <div className="input">input</div>
        <div className="output">output</div>
      </div>
    </div>
  );
};

export default Compiler;
