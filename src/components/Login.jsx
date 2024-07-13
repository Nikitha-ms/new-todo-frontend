import { useState ,useContext} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

const Login = ({setIsLogin}) => {
  const { login } = useContext(AuthContext);
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
      <span onClick={() => setIsLogin(false)}>Go to Register</span>
    </div>
  );
};

Login.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};

export default Login;
