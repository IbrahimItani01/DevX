import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import blackLogo from "../../assets/logoBlack.png";
import FileAdd from "../FileAdd";
import FileContainer from "./FileContainer";
import "../../styles/sidebar.css";
import SignOut from "./SignOut";
import { filesContext } from "../../context/FilesContext";

const SideBar = () => {
    const { filesData, selectFile } = useContext(filesContext);
const [activeFileId, setActiveFileId] = useState(null); // Track active file
  const navigate = useNavigate();

  const handleFileClick = (fileId) => {
    if (activeFileId === fileId) {
      // If file is already active, deselect and navigate to /panel
      setActiveFileId(null);
      selectFile(null);
      navigate(`/panel`);
    } else {
      // Otherwise, set as active and navigate to /panel/{fileId}
      setActiveFileId(fileId);
      selectFile(fileId);
      navigate(`/panel/${fileId}`);
    }
  };

  return (
    <div className='side-bar'>
      <div className='file-add'>
        <img alt='logo' src={blackLogo} width={50}></img>
        <FileAdd/>
      </div>
      <div className='files-list'>
        {filesData.map((file)=>(
            <FileContainer name={file.fileName} key={file.id}/>
        ))}
      </div>
      <div className='signout'>
        <SignOut/>
      </div>
    </div>
  )
}

export default SideBar
