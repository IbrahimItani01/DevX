import React, { useState } from 'react'
import {CirclePlus} from "lucide-react";
const FileAdd = () => {
    const [fileName,setFileName] = useState("");
    const handleChange = (e)=>{
        setFileName(e.target.value);
    }
    const handleFileCreate = ()=>{
        
    }
  return (
    <div className='add-file'>
      <input placeholder='File Name ...' type='text' onChange={handleChange} value={fileName}></input>
      <CirclePlus width={30} onClick={handleFileCreate} color='black' style={{cursor:"pointer"}}/>
    </div>
  )
}

export default FileAdd
