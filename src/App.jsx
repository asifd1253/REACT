import { lazy, Suspense, useState, useEffect } from "react";
import { createBrowserRouter } from "react-router";
import Header from "./pages/Header.jsx";
import { Outlet } from "react-router";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import Error from "./components/Error";
// import Body from "./components/Body";
const Body = lazy(() => import("./pages/Body.jsx"));
import BodyShimmer from "./components/BodyShimmer";
// import RestaurantMenu from "./components/RestaurantMenu.jsx";
const RestaurantMenu = lazy(() => import("./pages/RestaurantMenu.jsx"));
import MenuShimmer from "./components/MenuShimmer.jsx";
import UserContext from "./contexts/UserContext.jsx";
import appStore from "./redux/appStore.js";
import { Provider } from "react-redux";
import Cart from "./pages/Cart.jsx";
import Payments from "./pages/Payments.jsx";

const App = () => {
  const [curUser, setCurUser] = useState("");

  useEffect(() => {
    const userData = { name: "Anas" };
    setCurUser(userData.name);
  }, []);

  return (
    <div>
      <Provider store={appStore}>
        <UserContext.Provider value={{ loggedInUser: curUser }}>
          <Header />
          <Outlet />
        </UserContext.Provider>
      </Provider>
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
        element: (
          <Suspense
            fallback={
              <div className="flex flex-wrap justify-center">
                {Array.from({ length: 12 }, (_, index) => (
                  <BodyShimmer key={index} />
                ))}
              </div>
            }
          >
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/restaurant",
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
        element: (
          <Suspense fallback={<MenuShimmer />}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
    ],
  },
]);

export default App;
