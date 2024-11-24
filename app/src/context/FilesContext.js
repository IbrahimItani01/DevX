import React, { createContext, useState } from "react";

export const filesContext = createContext();

const FilesProvider = ({ children }) => {
  const [filesData, setFilesData] = useState([
    { id: "1", fileName: "File 1"},
    { id: "2", fileName: "File 2"},
  ]);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const selectFile = (id) => setSelectedFileId(id);

  return (
    <filesContext.Provider
      value={{ filesData, setFilesData, selectedFileId, selectFile }}
    >
      {children}
    </filesContext.Provider>
  );
};

export default FilesProvider;
