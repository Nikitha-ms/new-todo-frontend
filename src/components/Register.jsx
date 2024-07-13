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
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (data.username === "" || data.email === "" || data.password === "") {
      alert("Please fill all the fields");
      return;
    } else {
      register(data.username, data.email, data.password);
    }
  };

  return (
    <div className="flex flex-col w-full m-auto h-full items-center align">
      <h1 className="text-2xl font-bold">Register</h1>
      <div className="flex  flex-col">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <button onClick={handleRegister}>Register</button>
      </div>
      <span onClick={() => setIsLogin(true)}>Go to Login</span>
    </div>
  );
};
Register.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};

export default Register;
