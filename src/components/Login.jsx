import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

const Login = ({ setIsLogin }) => {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setLoginError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      alert("Please fill all the fields");
      return;
    } else {
      try {
        const res = await login(data.email, data.password);
        if (!res.success) {
          throw res.error;
        }
        console.log(res);
      } catch (error) {
        console.log(error);
        setLoginError(error.message || "An error occurred during login.");
      }
      console.log(loginError);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#3d1431] h-screen w-screen">
      <div className="flex flex-col justify-center items-center h-[50%] w-[50%] bg-gray-700 rounded-xl m-[10px]">
        <h1 className="text-2xl text-white font-bold mb-5">Login</h1>
        <div className="flex flex-col w-full justify-center items-center">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="mb-2 p-2 w-[50%] rounded-lg font-sans font-semibold"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="mb-2 p-2 w-[50%] rounded-lg font-sans font-semibold"
          />
          {loginError && <p className="text-red-500">{loginError}</p>}
          <button
            onClick={handleLogin}
            className="mt-4 bg-blue-500 w-[50%] text-white p-2 rounded-lg shadow-2xl font-sans font-bold"
          >
            Login
          </button>
        </div>
        <span className="text-white mt-6 cursor-pointer font-sans font-semibold" onClick={() => setIsLogin(false)}>Go to Register</span>
      </div>
    </div>
  );
};

Login.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};

export default Login;
