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

const is_logined = () => {
   return !!getToken();
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
   <AuthContext.Provider value={{setUserDate , getUser , setToken , getToken , removeToken}}>
      {children}
   </AuthContext.Provider>
);
}

export const useAuth = () => {
   return useContext(AuthContext);
};