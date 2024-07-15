import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

const Login = ({ setIsLogin }) => {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", login: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let errorMessages = {};
    if (data.email === "") {
      errorMessages.email = "Email is required";
    }
    if (data.password === "") {
      errorMessages.password = "Password is required";
    }
    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    try {
      const res = await login(data.email, data.password);
      if (!res.success) {
        throw res.error;
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      setErrors({ ...errors, login: error.message || "An error occurred during login." });
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
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="mb-2 p-2 w-[50%] rounded-lg font-sans font-semibold"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          {errors.login && <p className="text-red-500">{errors.login}</p>}
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
