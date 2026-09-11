import Header from "./components/Header";
import Body from "./components/Body";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
