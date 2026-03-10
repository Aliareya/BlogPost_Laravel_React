import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// ----- Token helpers -----
export const setToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
};

// ----- Auth Provider -----
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Set user data
  const setUserDate = (userData) => {
    setUser(userData);
  };

  const getUserDate = () => {
    return user;
  }

  // Fetch user data from API
  const fetchUserData = async () => {
    setLoading(true);
    const token = getToken();

    if (!token) {
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDate(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      removeToken(); // remove invalid token
      setLoading(false);
      navigate("/login");
    }
  };

  // Check if user is logged in
  const checkLogin = () => {
    const token = getToken();
    if (!token) return false;
    if (user && user.role) return true;
    return false;
  };

  // Redirect if not logged in
  const requireLogin = () => {
    if (!checkLogin()) {
      navigate("/login");
    }
  };

  //   // Optional: fetch user data on mount
  //   useEffect(() => {
  //     fetchUserData();
  //   }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserDate,
        fetchUserData,
        checkLogin,
        requireLogin,
        setToken,
        getToken,
        removeToken,
        loading,
        getUserDate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuth = () => {
  return useContext(AuthContext);
};
