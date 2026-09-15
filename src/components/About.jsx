import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      age: 23,
    };
  }
  render() {
    return (
      <div>
        <h1>My name is Asif</h1>
        <h2>I am a software developer</h2>
        <p>I am {this.state.age} years old</p>
        <button
          onClick={() => {
            this.setState({ age: this.state.age + 1 });
          }}
        >
          Increase Age
        </button>
      </div>
    );
  }
}

export default About;
