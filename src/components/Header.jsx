import { useState } from "react";
import { LOGO } from "../utils/constants";
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
          <li className="cursor-pointer font-medium active:scale-95">Home</li>
          <li className="cursor-pointer font-medium active:scale-95">Orders</li>
          <li className="cursor-pointer font-medium active:scale-95">Cart</li>
          <li className="cursor-pointer font-medium active:scale-95">
            Profile
          </li>
          {/* <li className="cursor-pointer font-medium">Login</li>
          <li className="cursor-pointer font-medium">Signup</li> */}
          <button
            onClick={handleLoginBtn}
            className="cursor-pointer border border-gray-300 w-auto px-2 rounded-lg bg-white py-0.5 font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-blue-500 hover:text-blue-600 active:scale-95"
          >
            {loginBtn}
          </button>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
