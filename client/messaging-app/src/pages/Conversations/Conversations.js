import React, { Component } from "react";

export class Conversations extends Component {
  componentDidMount() {
    setTimeout(function () {
      const token = localStorage.getItem("userid");
      console.log(token);
      localStorage.clear();
    }, 50);
  }
  render() {
    return <div>Hello UserID , {this.props.routerprops}</div>;
  }
}

export default Conversations;
