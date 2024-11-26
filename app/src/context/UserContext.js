import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({ name: "", userEmail: "" });
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getUser", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((res) => {
        setUserData({
          name: res.data.name,
          userEmail: res.data.email,
        });
      });
  }, []);

  return (
    <userContext.Provider value={userData}>{children}</userContext.Provider>
  );
};
export default UserProvider;
