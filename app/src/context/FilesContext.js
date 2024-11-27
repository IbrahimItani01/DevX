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
        const fullData = response.data.owner_files.concat(
          response.data.collaborator_files
        );
        console.log(fullData);
        setFilesData(fullData);
      })
      .catch((e) => toast.error(e.response.data));
  }, []);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const selectFile = (fileId) => {
    setSelectedFileId(fileId);
  };

  const saveContent = (fileId, newContent, name, language) => {
    setFilesData((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId ? { ...file, content: newContent } : file
      )
    );
    axios
      .post(
        "http://localhost:8000/api/upload",
        {
          file_id: parseInt(fileId),
          file_name: name,
          file_content: newContent,
          file_language: language,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      )
      .then((response) => {
        setFilesData((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId ? { ...file, content: newContent } : file
          )
        );
      })
      .catch((e) => toast.error(e));
    // Sync with database
    console.log(`Saving file ${fileId}:`, newContent);
  };

  return (
    <filesContext.Provider
      value={{
        filesData,
        selectedFileId,
        selectFile,
        saveContent,
        setFilesData,
      }}
    >
      {children}
    </filesContext.Provider>
  );
};

export default FilesProvider;
