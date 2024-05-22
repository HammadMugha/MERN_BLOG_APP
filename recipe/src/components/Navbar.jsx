import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { BiMenu, BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");
  console.log(auth);
  const handleLogout = () => {
    alert("logged out successfully");
    setAuth({ ...auth, user: null });
    localStorage.removeItem("auth");
    axios.get("http://localhost:8000/logout").then((res) => {
      if (res.data === "Success") {
        window.location.href = "/signup";
      }
    });
  };

  return (
    <>
      <div className="nav">
        <div className="nav_center relative">
          <BiSearch
            className="absolute top-[10px] left-2 cursor-pointer"
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
          />
          <input
            placeholder="Search..."
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-transparent max-w-[280px] text-[#333] py-1 pl-7 pr-2 border-[#d8d8d8] border rounded-[30px] outline-none w-full md:w-[400px]"
          />
        </div>
        <div className="logo">
          <Link to="/">
            <h2 className="text-[20px] text-center font-semibold">MAGDESIGN</h2>
          </Link>
        </div>
        <div className="flex justify-end">
          <LuMenu
            onClick={() => setMenu(true)}
            className="cursor-pointer text-[25px] transition-all duration-200 hover:translate-y-[-2px]"
          />
          <ul
            className={`flex items-center justify-center gap-8 flex-col fixed top-0 ${
              menu ? "right-0" : "right-[-100%]"
            } transition-all duration-500 shadow-md bg-white h-screen w-[300px]`}
          >
            <IoClose
              onClick={() => setMenu(false)}
              className="cursor-pointer text-[35px] absolute right-[30px] top-5"
            />
            {auth?.user ? (
              <>
                {/* <li><Link to="/about">About</Link></li> */}
                <li>
                  <Link to="/create">Create</Link>
                </li>
                <li>
                  <Link to="/blogs">All Blogs</Link>
                </li>
                <div
                  className="menu border-gray-400 p-2 rounded-[16px] shadow-lg bg-white flex relative items-center gap-2 cursor-pointer"
                  onClick={() => setMenu(!menu)}
                >
                  <span className={"text-[13px]"}>{auth?.user?.name}</span>
                  <BiMenu />
                  {menu && (
                    <div className="menu_show absolute top-12 bg-white border-gray-400 py-3 px-3 left-[-24px] rounded-[16px] shadow-lg flex items-center gap-2 cursor-pointer w-[150px]">
                      <ul className="flex flex-col gap-1">
                        <Link to={"/profile"}>Profile</Link>
                        <Link to={"/user-blogs"}>My Blogs</Link>
                        <Link to={"/users"}>Authors</Link>
                        <button className="btn primary" onClick={handleLogout}>
                          logout
                        </button>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <li>
                  <Link to="/users">Authors</Link>
                </li>
                <button className="btn primary">
                  <Link to="/signup" className="primary">
                    Signup
                  </Link>
                </button>
                <button className="btn primary">
                  <Link to="/login" className="primary">
                    Login
                  </Link>
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
