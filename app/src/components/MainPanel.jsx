import React from 'react'
import SideBar from './base/SideBar'
import Header from './base/Header'
import Compiler from './base/Compiler'

const MainPanel = () => {
  return (
    <>
      <SideBar/>
      <Header/>
      <Compiler/>
    </>
  )
}

export default MainPanel
