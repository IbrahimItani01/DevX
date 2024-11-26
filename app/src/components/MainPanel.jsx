import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./base/SideBar";
import Header from "./base/Header";
import Compiler from "./base/Compiler";
import "../styles/mainpanel.css";
import { filesContext } from "../context/FilesContext";

const MainPanel = () => {
  const { saveContent } = useContext(filesContext);

  return (
    <div className="main-panel">
      <SideBar />
      <div className="body-panel">
        <Header />
        <Routes>
          <Route
            path={"/:id"}
            element={<Compiler saveContent={saveContent} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default MainPanel;
