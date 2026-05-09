import { createContext, useContext, useEffect, useState } from "react";

// Import jwt decode to decode the token and check expiry time
import { jwtDecode } from "jwt-decode";

// Creating authentication context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store logged in user
  const [user, setUser] = useState(null);
  // State to store JWT token
  const [token, setToken] = useState(null);
  // Loading state until auth checking is completed
  const [loading, setLoading] = useState(true);

  // Function to check whether token is expired or not
  const isTokenExpired = (token) => {
    try {
      // Decode token
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      // If token is invalid then treat it as expired
      return true;
    }
  };

  // useEffect to check token and user on render
  useEffect(() => {
    // Getting saved token and user from localStorage
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // If token or user does not exist
    if (!storedToken || !storedUser) {
      logout();
      setLoading(false);
      return;
    }

    // If token is expired then redirect to homepage and logout
    if (isTokenExpired(storedToken)) {
      window.location.href = "/";
      logout();
      setLoading(false);
      return;
    }

    // If token, then store in token state
    setToken(storedToken);
    // Convert string user data back into object
    setUser(JSON.parse(storedUser));

    // set loading state false after Authentication is complete
    setLoading(false);
  }, []); 
  
  // LOGIN
  // GETTING USERDATA AND TOKENDATA FROM BACKEND
  const login = (userData, tokenData) => {
    // STORE USERDATA AND TOKENDATA IN STATE
    setUser(userData);
    setToken(tokenData);
    // STORING USERDATA AND TOKENDATA IN LOCALSTORAGE
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    // REMOVE USER AND TOKEN  FROM LOCALSTORAGE
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // AUTH STATE
  const isAuthenticated = !!user && !!token;

  // AUTO LOGOUT WHEN TOKEN EXPIRES
  useEffect(() => {
        // If no token then do nothing
    if (!token) return;

    const interval = setInterval(() => {
            // If token expired then logout user
      if (isTokenExpired(token)) {
        logout();
        window.location.href = "/";
      }
    }, 60000); // check every 1 minute
        // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =========================================
// CUSTOM HOOK
// =========================================
// This hook helps us access auth context easily
export const useAuth = () => useContext(AuthContext);
