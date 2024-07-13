import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Nav = () => {
  const { user,username, logout } = useContext(AuthContext);
 
  return (
    <nav className="h-16 flex px-[10%] shadow-lg items-center justify-between w-full bg-white">
      <h1 className="text-3xl text-black">Todo-List</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4 text-black">{username} </span>
            <button
              onClick={() => {
                logout();
              }}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Nav;