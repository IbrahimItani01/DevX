import React from 'react'
import SideBar from './base/SideBar'
import Header from './base/Header'
import Compiler from './base/Compiler'
import "../styles/mainpanel.css"
const MainPanel = () => {
  return (
    <div className='main-panel'>
      <SideBar/>
      <div className='body-panel'>
        <Header/>
        <Compiler/>
      </div>
    </div>
  )
}

export default MainPanel
