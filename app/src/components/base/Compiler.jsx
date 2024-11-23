import React, { useEffect, useRef } from "react";
import "../../styles/compiler.css";
import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";

const Compiler = () => {
  const editorRef = useRef(null);

  const handleMount = (editor) => {
    editorRef.current = editor;
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
  return (
    <div className="compiler-section">
      <div className="editor">
        <Editor
          height="95vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onMount={handleMount}
        />
        <Play color="black" className="play" />
      </div>
      <div className="input-output">
        <div className="input">input</div>
        <div className="output">output</div>
      </div>
    </div>
  );
};

export default Compiler;
