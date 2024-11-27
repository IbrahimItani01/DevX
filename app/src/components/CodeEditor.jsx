import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript"; // Include JavaScript mode
import "codemirror/lib/codemirror.css"; // Include CodeMirror styles
import echo from "../utils/echo"; // Import Laravel Echo instance

const MessageEditor = ({ userId }) => {
    const { documentId } = useParams(); // Get the dynamic `documentId` from the URL
    const textareaRef = useRef(null); // Ref for the textarea element
    const [content, setContent] = useState(""); // Local state for editor content
    const [editor, setEditor] = useState(null); // Reference to CodeMirror instance

    useEffect(() => {
        if (textareaRef.current) {
            // Initialize CodeMirror
            const cmInstance = CodeMirror.fromTextArea(textareaRef.current, {
                mode: "javascript", // Example mode
                lineNumbers: true,
                theme: "default",
            });

            // Handle local content changes
            cmInstance.on("change", (instance) => {
                const newContent = instance.getValue();
                setContent(newContent); // Update local state

                // Send updates to the backend
                sendUpdate(newContent);
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
        }
    }, [documentId, userId]);

    // Function to send updates to the backend
    const sendUpdate = (newContent) => {
        fetch("http://localhost:8000/update-document", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                documentId,
                content: newContent,
            }),
        });
    };

    return (
        <div className="message-editor-container">
            <textarea ref={textareaRef} defaultValue={content} />
        </div>
    );
};

export default MessageEditor;