import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./components/About";
import Profile from "./components/Profile";
import Error from "./components/Error";
import Body from "./components/Body";

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <div>
//     <App />
//   </div>,
// );

const appRouter = createBrowserRouter([
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
    ],
  },
]);

root.render(<RouterProvider router={appRouter} />);
