import axios from "axios";
import React, { Component } from "react";
const userURL = "http://localhost:8080/users/";

export class Conversations extends Component {
  state = {
    userAdded: [],
    userID: "",
  };
  componentDidMount() {
    /*setTimeout(function () {
      const token = localStorage.getItem("userid");
      console.log(token);

      
    }, 50);*/

    axios.get(userURL + this.props.routerprops).then((response) => {
      console.log(response);
      this.setState({
        userID: this.props.routerprops,
        userAdded: response.data.userAdded,
      });
      console.log(this.state);
    });
  }
  render() {
    const userList = this.state.userAdded.map((users) => {
      return (
        <>
          <h1>userID - {users.userid} </h1>
          <h1>userName - {users.username} </h1>
          <h1>User Added - {users.created} </h1>
        </>
      );
    });

    return (
      <>
        <div>Hello UserID , {this.props.routerprops}</div>
        <div>{userList}</div>
      </>
    );
  }
}

export default Conversations;
