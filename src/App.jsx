import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Header from "./components/Header";
import { Outlet } from "react-router";
import About from "./components/About";
import Profile from "./components/Profile";
import Error from "./components/Error";
// import Body from "./components/Body";
const Body = lazy(() => import("./components/Body"));
import BodyShimmer from "./components/BodyShimmer";
// import RestaurantMenu from "./components/RestaurantMenu.jsx";
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu.jsx"));
import MenuShimmer from "./components/MenuShimmer.jsx";

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
    ],
  },
]);

export default App;
