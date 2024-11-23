import React, { useContext, useState } from 'react'
import {CirclePlus} from "lucide-react";
import { filesContext } from '../context/FilesContext';
const FileAdd = () => {
    const [fileName,setFileName] = useState("");
    const [alert,setAlert]=useState(false);
    const {setFilesData}=useContext(filesContext);
    const handleChange = (e)=>{
        setFileName(e.target.value);
    }
    const handleFileCreate = ()=>{
        if(fileName){
          // TODO: handle file create api
          setFilesData((prev)=>[
            ...prev,
            {
              id:2,
              fileName
            }
          ]
           
          )
          setAlert(false);
          setFileName("");
        }
        else{
          setAlert(true);
        }

    }
  return (
    <div className='add-file'>
      <input placeholder='File Name ...' type='text' onChange={handleChange} value={fileName}></input>
      {alert && <em>Note! Enter a file name ... </em>}
      <CirclePlus width={30} onClick={handleFileCreate} color='black' style={{cursor:"pointer"}}/>
    </div>
  )
}

export default FileAdd
