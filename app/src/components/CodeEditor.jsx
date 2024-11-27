import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To access `documentId` from the URL
import CodeMirror from "codemirror"; // Code editor library
import "codemirror/mode/javascript/javascript"; // Example: JavaScript mode
import "codemirror/lib/codemirror.css"; // Include CodeMirror styles
import echo from "../utils/echo"; // Import Laravel Echo instance

const CodeEditor = ({ userId }) => {
    const { documentId } = useParams(); // Get the dynamic `documentId` from the URL
    const [content, setContent] = useState(""); // Local state for editor content
    const [editor, setEditor] = useState(null); // Reference to CodeMirror instance

    useEffect(() => {
        // Initialize CodeMirror
        const cmInstance = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
            mode: "javascript", // Example mode
            lineNumbers: true,
            theme: "default",
        });

        // Handle local content changes
        cmInstance.on("change", (instance) => {
            const newContent = instance.getValue();
            const cursorPosition = instance.getCursor();

            setContent(newContent); // Update local state

            // Send updates to the backend
            sendUpdate(newContent, cursorPosition);
        });

        setEditor(cmInstance);

        // Subscribe to Laravel Echo for real-time updates
        const channel = echo.channel(`document-${documentId}`);
        channel.listen(".message-sent", (event) => {
            console.log("Event received:", event);
            if (event.userId !== userId) {
                // Update the editor content if the change is from another user
                cmInstance.setValue(event.message);
                cmInstance.setCursor(event.cursorPosition);
            }
        });

        // Cleanup on component unmount
        return () => {
            echo.leaveChannel(`document-${documentId}`);
        };
    }, [documentId, userId]);

    // Function to send updates to the backend
    const sendUpdate = (newContent, cursorPosition) => {
        fetch("/update-document", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                documentId,
                content: newContent,
                cursorPosition,
            }),
        });
    };

    return (
        <div className="code-editor-container">
            <textarea id="code-editor" defaultValue={content} />
        </div>
    );
};

export default CodeEditor;