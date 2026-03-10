import axios from "axios";
import { createContext , useContext, useState} from "react";

const AuthContext = createContext();

export const setToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
};

const fetchUserData = async () => {
   try {
      const response = await axios.get('http://localhost:8000/api/user',{
         withCredentials: true,
      })
      console.log('User data fetched successfully:', response.data);
   } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
   }
}

export const AuthProvider = ({ children }) => {
   const [user , setUser] = useState({});  

   const setUserDate = (userData) => {
      setUser(userData);
   }

   const getUser = () => {
      return user;
   }

   return (
   <AuthContext.Provider value={{setUserDate , getUser ,fetchUserData, setToken , getToken , removeToken}}>
      {children}
   </AuthContext.Provider>
);
}

export const useAuth = () => {
   return useContext(AuthContext);
};