import React, { useContext } from "react";
import { Routes, Route} from "react-router-dom";
import SideBar from "./base/SideBar";
import Header from "./base/Header";
import Compiler from "./base/Compiler";
import "../styles/mainpanel.css";
import { filesContext } from "../context/FilesContext";

const MainPanel = () => {
  const { filesData, saveContent  } = useContext(filesContext);

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
              element={<Compiler file={file} saveContent={saveContent}  />}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default MainPanel;
