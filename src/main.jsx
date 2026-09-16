import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { appRouter } from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <div>
//     <App />
//   </div>,
// );

root.render(<RouterProvider router={appRouter} />);
