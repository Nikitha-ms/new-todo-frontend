import { useState } from "react";
import API from "../utils/API";
const Register = () => {
 
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

  const register = async (username, email, password) => {
    try {
      const response = await API.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log(response.data);
      if (response.status === 200) {
        alert("User Registered Successfully");
      }
    } catch (error) {
      console.error("Registration error:", error.response.data);
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
    </div>
  );
};

export default Register;
