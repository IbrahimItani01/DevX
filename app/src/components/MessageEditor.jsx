import React, { useState, useEffect } from "react";
import echo from "../utils/echo"; // Import the Echo configuration
import CodeMirror from "codemirror"; // Install codemirror if you haven't already
import "codemirror/mode/javascript/javascript"; // Example: JavaScript mode
import "codemirror/lib/codemirror.css"; // Include CodeMirror's default CSS

const MessageEditor = ({ documentId, userId }) => {
    const [content, setContent] = useState(""); // Local state for the editor content
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        // Initialize CodeMirror editor
        const cmInstance = CodeMirror.fromTextArea(document.getElementById("message-editor"), {
            mode: "javascript", // Language mode
            lineNumbers: true,
            theme: "default",
        });

        cmInstance.on("change", (instance) => {
            const newContent = instance.getValue();
            const cursorPosition = instance.getCursor();

            setContent(newContent); // Update state
            // Send updates to the backend
            sendUpdate(newContent, cursorPosition);
        });

        setEditor(cmInstance);

        // Subscribe to Laravel Echo channel for real-time updates
        const channel = echo.channel(`document-${documentId}`);
        channel.listen(".message-sent", (event) => {
            if (event.userId !== userId) {
                // Update the editor content only if the update is from another user
                cmInstance.setValue(event.message);
                cmInstance.setCursor(event.cursorPosition);
            }
        });

        return () => {
            // Unsubscribe on component unmount
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
        <div>
            <textarea id="message-editor" defaultValue={content} />
        </div>
    );
};

export default MessageEditor;