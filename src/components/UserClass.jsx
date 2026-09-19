import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log("child constructor ");
  }
  componentDidMount() {
    console.log("child Component Did Mount");
  }
  render() {
    console.log("child render");

    return (
      <div>
        <h1>My name is {this.props.name}</h1>
        <p>I am {this.props.age} years old</p>
        {/* <button
          onClick={() => {
            this.setState({ age: this.state.age + 1 });
          }}
        >
          Increase Age
        </button> */}
      </div>
    );
  }
}

export default UserClass;
