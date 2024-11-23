import React, { useContext } from 'react'
import blackLogo from "../../assets/logoBlack.png"
import FileAdd from '../FileAdd'
import FileContainer from './FileContainer'
import "../../styles/sidebar.css"
import SignOut from './SignOut'
import { filesContext } from '../../context/FilesContext'
const SideBar = () => {
    const {filesData}=useContext(filesContext);
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
