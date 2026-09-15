import { createBrowserRouter } from "react-router";
import Header from "./components/Header";
import Body from "./components/Body";
import { Outlet } from "react-router";
import About from "./components/About";
import Profile from "./components/Profile";
import Error from "./components/Error";
import Body from "./components/Body";
import RestaurantMenu from "./components/RestaurantMenu.jsx";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/restaurant/:restaurantId",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

export default App;
