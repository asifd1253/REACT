import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }
  componentDidUpdate() {
    this.timer = setInterval(() => {
      console.log("setInterval");
    }, 1000);
    console.log("userClass componentDidUpdate");
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    console.log("userClass componentWillUnmount");
  }
  render() {
    const { userInfo } = this.props;
    return (
      <div>
        <img src={userInfo.avatar_url} alt="image" />
        <p>My name is {userInfo.name}</p>
      </div>
    );
  }
}

export default UserClass;
