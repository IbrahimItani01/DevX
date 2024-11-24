import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./base/SideBar";
import Header from "./base/Header";
import Compiler from "./base/Compiler";
import "../styles/mainpanel.css";
import { filesContext } from "../context/FilesContext";

const MainPanel = () => {
  const { filesData, selectedFileId } = useContext(filesContext);

  return (
    <div className="main-panel">
      <SideBar />
      <div className="body-panel">
        <Header />
        <Routes>

          {filesData.map((file) => (
            <Route
              key={file.id}
              path={`${file.id}`}
              element={<Compiler file={file} />}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default MainPanel;
