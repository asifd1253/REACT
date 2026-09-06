import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Title = () => <h1 id="heading">This is a Title1</h1>;
const Title2 = () => <h1 id="heading">This is a Title2</h1>;

// React Functional Componenet
// Component Composition
const HeadingComponent = () => {
  return (
    <div>
      <Title />
      <Title></Title>
      {Title()}
      {200 + 300}
      <h1>This is a h1 tag</h1>
      <h2>This is a h2 tag</h2>
      <h2>Adding two numbers: {100 + 200}</h2>
    </div>
  );
};

root.render(<HeadingComponent />);
