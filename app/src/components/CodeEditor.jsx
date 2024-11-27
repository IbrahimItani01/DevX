import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import echo from "../utils/echo";

const MessageEditor = () => {
    const { documentId, userId } = useParams();
    const textareaRef = useRef(null);
    const editorRef = useRef(null);
    let isLocalChange = false; // Track local changes

    useEffect(() => {
        if (textareaRef.current) {
            const cmInstance = CodeMirror.fromTextArea(textareaRef.current, {
                mode: "javascript",
                lineNumbers: true,
                theme: "default",
            });

            editorRef.current = cmInstance;

            // Handle local content changes
            cmInstance.on("change", (instance) => {
                if (!isLocalChange) {
                    const newContent = instance.getValue();
                    sendUpdate(newContent, instance.getCursor());
                }
                isLocalChange = false; // Reset flag
            });

            // Subscribe to Laravel Echo for real-time updates
            const channel = echo.channel(`document-${documentId}`);
            channel.listen(".message-sent", (event) => {
                console.log("Event received:", event);
                if (event.userId !== userId) {
                    applyRemoteChanges(event.content, event.cursorPosition);
                }
            });

            // Cleanup on component unmount
            return () => {
                echo.leaveChannel(`document-${documentId}`);
            };
        }
    }, [documentId, userId]);

    const sendUpdate = (newContent, cursorPosition) => {
        fetch("http://localhost:8000/api/update-document", {
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

    const applyRemoteChanges = (newContent, cursorPosition) => {
        if (editorRef.current) {
            const cmInstance = editorRef.current;

            if (cmInstance.getValue() !== newContent) {
                console.log("Updating editor content from remote changes");

                const scrollInfo = cmInstance.getScrollInfo();

                // Suppress the `change` event
                isLocalChange = true;
                cmInstance.setValue(newContent);
                cmInstance.setCursor(cursorPosition);
                cmInstance.scrollTo(scrollInfo.left, scrollInfo.top);
            } else {
                console.log("Content already up-to-date. No update needed.");
            }
        } else {
            console.log("Editor instance not found. Cannot apply remote changes.");
        }
    };

    return (
        <div className="message-editor-container">
            <textarea ref={textareaRef} defaultValue="" />
        </div>
    );
};

export default MessageEditor;
