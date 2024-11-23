import React from 'react'
import blackLogo from "../../assets/logoBlack.png"
import FileAdd from '../FileAdd'
const SideBar = () => {
  return (
    <div className='side-bar'>
      <div className='file-add'>
        <img alt='logo' src={blackLogo} width={50}></img>
        <FileAdd/>
      </div>
    </div>
  )
}

export default SideBar
