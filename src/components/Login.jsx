import { useState } from "react";
import API from "../utils/API";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      alert("Please fill all the fields");
      return;
    } else {
      login(data.email, data.password);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await API.post("/auth/login", { email, password });
      console.log(response.data);
    } catch (error) {
      console.error("Login error:", error.response.data);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <div className="flex flex-col w-full m-auto h-full items-center align">
      <h1 className="text-2xl font-bold">Login</h1>
      <div className="flex flex-col">
        <input
          type="text"
          name="email"  // Add this line
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"  // Add this line
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
