import { createContext, useState } from "react";

export const userContext = createContext();

const UserProvider = ({children})=>{
    // TODO: get current user data to pass
    const [userData,setUserData]=useState({name:"Ibrahim"});
    return(
        <userContext.Provider value={userData}>
            {children}
        </userContext.Provider>
    );
}
export default UserProvider