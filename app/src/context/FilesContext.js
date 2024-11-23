import { createContext, useState } from "react";

export const filesContext = createContext();

const FilesProvider = ({children})=>{
    const [filesData,setFilesData]=useState([]);
    // TODO: handle the get files data api
    return (
        <filesContext.Provider value={{
            filesData,
            setFilesData
        }
        }>
            {children}
        </filesContext.Provider>
    );
}

export default FilesProvider;