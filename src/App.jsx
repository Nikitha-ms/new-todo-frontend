import {useContext} from 'react'
import { useLocation, Navigate } from "react-router-dom";
import AuthPage from './Pages/AuthPage';
import TodoPage from './Pages/TodoPage';
import {Routes, Route } from "react-router-dom"
import "./index.css";
import AuthContext from "./context/AuthContext";

const App = () => {
  const { user } =useContext(AuthContext);
  const {pathname}=useLocation
  return (
    <div>
   <Routes>
        <Route
          path="/"
          element={user ? <TodoPage /> : <Navigate to="/auth" state={pathname} />}
        />
        <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
      </Routes>
    </div>
  )
}

export default App
