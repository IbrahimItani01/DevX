import React, { useContext, useState } from 'react'
import {CirclePlus} from "lucide-react";
import { filesContext } from '../context/FilesContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { snippets } from '../constants';
const FileAdd = () => {
    const [fileName,setFileName] = useState("");
    const [alert,setAlert]=useState(false);
    const {filesData,setFilesData}=useContext(filesContext);
    const handleChange = (e)=>{
        setFileName(e.target.value);
    }
    const handleFileCreate = ()=>{
        if(fileName){
          axios.post("http://localhost:8000/api/upload",{
              file_name: fileName,
              file_content: snippets["javascript"],
              file_language: 'javascript'
          },{
            headers:{
              "Content-Type":"application/json",
              "Authorization":`Bearer ${localStorage.token}`
            }
          }).then((response)=>{
            toast.success(response.data.message);
            console.log(filesData)
            setFilesData((prev)=>[
              ...prev,
              {
                id:filesData.length + 1,
                file_name:fileName
              }
            ]
             
            )
            setAlert(false);
            setFileName("");

          }).catch((e)=>toast.error(e))
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
