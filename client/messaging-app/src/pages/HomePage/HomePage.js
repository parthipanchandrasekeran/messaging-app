import React, { Component } from "react";

export class HomePage extends Component {
  render() {
    return <div>Hello UserID - {this.props.routerprops}</div>;
  }
}

export default HomePage;
