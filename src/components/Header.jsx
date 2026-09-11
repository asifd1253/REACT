import { useState } from "react";
import { LOGO } from "../utils/constants";
import { Link } from "react-router";

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");

  function handleLoginBtn() {
    if (loginBtn === "Login") {
      setLoginBtn("Signup");
    } else {
      setLoginBtn("Login");
    }
  }
  return (
    <header className="flex items-center justify-between bg-gray-100 px-8 py-4 shadow-md">
      <div className="w-28">
        <img
          src={LOGO}
          alt="logo"
          className="active:scale-95 w-full h-auto object-contain cursor-pointer"
        />
      </div>
      <nav>
        <ul className="flex items-center gap-8">
          <li className="cursor-pointer font-medium active:scale-95">
            <Link to="/">Home</Link>
          </li>

          <li className="cursor-pointer font-medium active:scale-95">
            <Link to="/about">About</Link>
          </li>

          <li className="cursor-pointer font-medium active:scale-95">
            <Link to="/">Orders</Link>
          </li>

          <li className="cursor-pointer font-medium active:scale-95">
            <Link to="/">Cart</Link>
          </li>

          <li className="cursor-pointer font-medium active:scale-95">
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <button
              onClick={handleLoginBtn}
              className="cursor-pointer rounded-lg border-2 border-gray-300 bg-white px-3 py-1 font-semibold text-white-700 transition-all duration-300 hover:border-blue-500 hover:bg-blue-100 hover:text-white-500 active:scale-95"
            >
              {loginBtn}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
