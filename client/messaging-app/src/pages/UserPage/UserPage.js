import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../UserPage/UserPage.scss";
import moment from "moment";
import axios from "axios";

const userURL = "http://localhost:8080/users/";

export class UserPage extends Component {
  state = {
    userAdded: [],
    conversationPage: false,
  };

  getConversationPage = (event) => {
    event.preventDefault();
    this.setState({ conversationPage: true });
  };
  componentDidMount() {
    axios.get(userURL + this.props.routerprops).then((response) => {
      this.setState({ userAdded: response.data.userAdded });
      console.log(this.state.userAdded);
    });
  }

  render() {
    if (this.state.conversationPage === true) {
      return <Redirect to={"/conversation/" + this.props.routerprops} />;
    }
    const users = this.state.userAdded.map((user, index) => {
      return (
        <tr className="user__info-table-row" key={user.userid + index}>
          <td className="user__user-id">{user.userid} </td>
          <td className="user__user-name">{user.username} </td>
          <td className="user__user-created">
            {moment(user.created).format("MMMM Do YYYY")}
          </td>
        </tr>
      );
    });
    return (
      <>
        <div>UserPage = {this.props.routerprops}</div>
        <table className="user__table-main">
          <tr className="user__header-main">
            <th className="user__user-id">UserID</th>
            <th className="user__user-name">User Name</th>
            <th className="user__user-created">User Created On</th>
          </tr>
          {users}
        </table>
        <button
          onClick={(event) => {
            this.getConversationPage(event);
          }}
          className="user__button"
        >
          Conversations
        </button>
      </>
    );
  }
}

export default UserPage;