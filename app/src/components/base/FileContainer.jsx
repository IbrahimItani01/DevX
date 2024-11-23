import React, {useState } from 'react'
import {ArrowRight, File} from 'lucide-react';
const FileContainer = ({name,collabs=0}) => {
  const [active,setActive] = useState(false)
  const handleFileOpen = ()=>{
    setActive(!active);
  }
  return (
    <div onClick={handleFileOpen} className='file-container'>
      <div className='file-info'>
          <div>
            <File color='black' />
            <p>{name}</p>
            {active && <ArrowRight color='black'/>}
          </div>
          {collabs>0 && <em>{collabs}</em> }
      </div>
      <div className='separator'></div>
    </div>
  )
}

export default FileContainer
