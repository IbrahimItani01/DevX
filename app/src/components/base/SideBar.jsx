import React from 'react'
import blackLogo from "../../assets/logoBlack.png"
import FileAdd from '../FileAdd'
import FileContainer from './FileContainer'
import "../../styles/sidebar.css"
import SignOut from './SignOut'
const SideBar = () => {
  return (
    <div className='side-bar'>
      <div className='file-add'>
        <img alt='logo' src={blackLogo} width={50}></img>
        <FileAdd/>
      </div>
      <div className='files-list'>
        <FileContainer/>
        <FileContainer/>
        <FileContainer/>
        <FileContainer/>
        <FileContainer/>
        <FileContainer/>
      </div>
      <div className='signout'>
        <SignOut/>
      </div>
    </div>
  )
}

export default SideBar
