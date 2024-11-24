import React, { createContext, useState } from "react";

export const filesContext = createContext();

const FilesProvider = ({ children }) => {
  const [filesData, setFilesData] = useState([
    { id: "1", fileName: "File1", content: "" },
    { id: "2", fileName: "File2", content: "" },
  ]);
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
