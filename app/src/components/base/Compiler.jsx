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
    <div>
      hi
    </div>
  )
}

export default Compiler
