import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const filesContext = createContext();

const FilesProvider = ({ children }) => {
  const [filesData, setFilesData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get-files", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token} `,
        },
      })
      .then((response) => {
        const fullData = response.data.owner_files.concat(response.data.collaborator_files);
        setFilesData(fullData)
        console.log(response.data)
      }).catch((e)=>toast.error(e.response.data))
  }, []);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const selectFile = (fileId) => {
    setSelectedFileId(fileId);
  };

  const saveContent = (fileId, newContent) => {
    setFilesData((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId ? { ...file, content: newContent } : file
      )
    );
    // Sync with database
    console.log(`Saving file ${fileId}:`, newContent);
  };

  return (
    <filesContext.Provider
      value={{ filesData, selectedFileId, selectFile, saveContent }}
    >
      {children}
    </filesContext.Provider>
  );
};

export default FilesProvider;
