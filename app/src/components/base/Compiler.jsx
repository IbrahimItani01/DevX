import React, { useEffect, useRef, useState } from "react";
import "../../styles/compiler.css";
import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

const Compiler = () => {
  const editorRef = useRef(null);
  const [language,setLanguage]=useState('javascript');
  const [script, setScript] = useState("");
  const handleMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const onSelect = (lang)=>{
    setLanguage(lang)
  }
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
