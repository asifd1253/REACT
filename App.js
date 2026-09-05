import React from "react";
import ReactDOM from "react-dom/client";


const root = ReactDOM.createRoot(document.getElementById("root"));

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", {}, [
    React.createElement("h1", {}, "This is first child1"),
    React.createElement("h2", {}, "This is first child2"),
  ]),
  React.createElement("div", {}, [
    React.createElement("h1", {}, "This is second child1"),
    React.createElement("h2", {}, "This is second child2"),
  ]),
]);

root.render(parent);

