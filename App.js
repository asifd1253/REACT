import React from "react";
import ReactDOM from "react-dom/client";

// Core React syntax
const ele = React.createElement(
  "h1",
  { id: "ele1" },
  "This is a React Element",
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(ele);

// JSX- HTML like syntax
const ele2 = <h1 id="ele2">This is HTML like syntax</h1>;
const grp = (
  <div>
    <h1 id="ele2">This is HTML like syntax</h1>
    <h1 id="ele2">This is HTML like syntax</h1>
  </div>
);
root.render(grp);
