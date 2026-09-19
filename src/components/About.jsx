import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parent constructor");

    this.state = {
      name: "Asif",
      age: 23,
    };
  }
  componentDidMount() {
    console.log("Parent Component Did Mount");
  }
  render() {
    console.log("parent render");

    return (
      <div>
        <h1>About Us</h1>
        <p>This is a food delivery app</p>
        <UserClass name={this.state.name} age={this.state.age} />
        <UserClass name="Alice" age={25} />
      </div>
    );
  }
}

export default About;
