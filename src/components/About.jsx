import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy Name",
        avatar_url: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      },
    };
  }
  async componentDidMount() {
    const response = await fetch("https://api.github.com/users/asifd1253");
    const json = await response.json();
    console.log(json);
    this.setState({
      userInfo: json,
    });
  }
  render() {
    return (
      <div>
        <UserClass userInfo={this.state.userInfo} />
      </div>
    );
  }
}

export default About;
