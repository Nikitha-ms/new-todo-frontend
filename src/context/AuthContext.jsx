import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API.js";
import  {jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [username , setUsername] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("withCreds"))
      API.get("/auth/refresh")
        .then((res) => {
          if (res.data.success) {
            const decoded = jwtDecode(res.data?.token);
            setUser(res.data?.token);
            setUsername(decoded.username);
            setId(decoded._id);
          } else {
            setUser(null);
            setUsername(null);
            setId(null);
            localStorage.removeItem("withCreds");
            throw new Error("Failed to refresh token");
          }
        })
        .catch((err) => {
          setUser(null);
          setUsername(null);
        });
  }, []);

  const register = async (username, email, password) => {
    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
      });
      if (res.data.success || res.status === 200) {
        const decoded = jwtDecode(res.data?.token);
        setUser(res.data?.token);
        setUsername(decoded.username);
        setId(decoded._id);
        localStorage.setItem("withCreds", true);
        alert("Registration successful!");
        console.log(user);
        console.log("registered successfully!");
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
      if (res.data.success || res.status === 200) {
        const decoded = jwtDecode(res.data.token);
        setUser(res.data.token);
        setUsername(decoded.username);
        setId(decoded._id);
        localStorage.setItem("withCreds", true);
        console.log(user);
        console.log("logged in successfully!");
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
        setUsername(null);
        setId(null);
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
        username,
        id,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
