import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";
import { useContext, useState } from "react";

const Register = ({ setIsLogin }) => {
  const { register } = useContext(AuthContext);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  }); // Add this line
  const [errors, setErrors] = useState({}); 
  const handleChange = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!data.username.trim()) {
      errors.username = "Username is required";
      formIsValid = false;
    }
    else if(!data.username.length<3 && data.username.length>15){
      errors.username = "Username must be at least 3 characters and at most 15 characters";
      formIsValid = false;
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
      formIsValid = false;
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
      formIsValid = false;
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      register(data.username, data.email, data.password);
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#3d1431] h-screen w-screen">
  <div className="flex flex-col justify-center items-center h-[50%] w-[50%] bg-gray-700 rounded-xl m-[10px]">
    <h1 className="text-2xl text-white font-bold mb-5">Register</h1>
    <div className="flex flex-col w-full justify-center items-center">
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={data.username}
        onChange={handleChange}
        className="mb-2 p-2  w-[50%] rounded-lg font-sans font-semibold"
      />
       {errors.username && <p className="text-red-500 text-sm mb-4">{errors.username}</p>}
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        className="mb-2 p-2 w-[50%] rounded-lg font-sans font-semibold"
      />
       {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={data.password}
        onChange={handleChange}
        className="mb-2 p-2 w-[50%] rounded-lg font-sans font-semibold"
      />
      {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}


      <button
        onClick={handleRegister}
        className="mt-4 bg-blue-500 w-[50%] text-white p-2 rounded-lg shadow-2xl font-sans font-bold ">
        Register
      </button>
    </div>
    <span className="text-white mt-6 cursor-pointer font-sans font-semibold" onClick={() => setIsLogin(true)}>Go to Login</span>
  </div>
</div>
  ); 
};
Register.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};

export default Register;
