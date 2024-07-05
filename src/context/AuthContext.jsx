import { useState,createContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API";
import { useEffect } from "react";

export const AuthContext = createContext();

 const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("withCreds"))
          API.get("/auth/refresh")
            .then((res) => {
              if (res.data.success) {
                setUser(res.data?.token);
              } else {
                setUser(null);
                localStorage.removeItem("withCreds");
                throw new Error("Failed to refresh token");
              }
            })
            .catch((error) => {
              setUser(null);
            });
      }, []);

      const register = async (username, email, password) => {
        try {
          const res = await API.post("/auth/register", {
            username,
            email,
            password,
          });
          if (res.data.success) {
            setUser(res.data?.token);
            localStorage.setItem("withCreds", true);
          } else {
            throw new Error(res.data.message);
          }
          return { success: true };
        } catch (error) {
          return { success: false, error: error.response?.data || error };
        }
      };

      const login = async (email, password) => {
        try {
          const res = await API.post("/auth/login", { email, password });
          if (res.data.success) {
            setUser(res.data.token);
            localStorage.setItem("withCreds", true);
          } else {
            throw new Error(res.data.message);
          }
          return { success: true };
        } catch (error) {
          return { success: false, error: error.response?.data || error };
        }
      };
    
      const logout = async () => {
        try {
          const res = await API.get("/auth/logout");
          if (res.data.success) {
            navigate("/auth");
            setUser(null);
            localStorage.removeItem("withCreds");
          } else {
            throw new Error(res.data.message);
          }
          return { success: true };
        } catch (error) {
          return { success: false, error: error.response?.data || error };
        }
      };
    
      return (
        <AuthContext.Provider
          value={{
            user,
            register,
            login,
            logout,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
    };

    export default AuthProvider;