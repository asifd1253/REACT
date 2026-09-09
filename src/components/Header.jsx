import { LOGO } from "../utils/constants";
const Header = () => {
  return (
    <header className="flex items-center justify-between bg-gray-100 px-8 py-4 shadow-md">
      <div className="w-28">
        <img
          src={LOGO}
          alt="logo"
          className="w-full h-auto object-contain cursor-pointer"
        />
      </div>
      <nav>
        <ul className="flex items-center gap-8">
          <li className="cursor-pointer font-medium">Home</li>
          <li className="cursor-pointer font-medium">Orders</li>
          <li className="cursor-pointer font-medium">Cart</li>
          <li className="cursor-pointer font-medium">Login</li>
          <li className="cursor-pointer font-medium">Signup</li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
