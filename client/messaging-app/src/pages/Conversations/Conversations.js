import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import moment from "moment";
import Logout from "../../components/Logout/Logout";
import "../Conversations/Conversations.scss";
const userURL = "http://localhost:8080/messages/";

export class Conversations extends Component {
  state = {
    conversations: [],
    userID: "",
    userPage: false,
    createConversation: false,
  };

  getUsers = (event) => {
    event.preventDefault();
    this.setState({ userPage: true });
  };

  getSessionID = () => {
    return sessionStorage?.userid;
  };

  addConversation = (event) => {
    event.preventDefault();
    this.setState({ createConversation: true });
  };

  componentDidMount() {
    axios.get(userURL + this.getSessionID()).then((response) => {
      this.setState({
        userID: this.getSessionID(),
        conversations: response.data,
        userPage: false,
        createConversation: false,
      });
    });
  }
  render() {
    if (this.state.userPage === true) {
      return <Redirect to={"userpage/" + this.getSessionID()} />;
    }
    if (this.state.createConversation === true) {
      return <Redirect to={"/conversation/create-conversation"} />;
    }
    const userList = this.state.conversations.map((conversation, index) => {
      return (
        <Link
          className="conversation__link"
          key={index}
          to={
            "/" +
            this.getSessionID() +
            "/conversation/" +
            conversation.conversationid
          }
        >
          <tr
            className="conversation__group-info-sub"
            key={conversation.conversationid + index}
          >
            <td className="conversation__group-name">
              {conversation.conversation}{" "}
            </td>
            <td className="conversation__group-created">
              {moment(conversation.created).format("MMMM Do YYYY")}
            </td>
          </tr>
        </Link>
      );
    });

    return (
      <div className="conversation__main-container">
        <div className="conversation__header">
          UserLoginID : {this.props.routerprops}
        </div>
        <table className="conversation__table-main">
          <tbody>
            <tr className="conversation__header-main">
              <th className="conversation__header-group-name">Group Name</th>
              <th className="conversation__header-group-created">
                Group Created On
              </th>
            </tr>
          </tbody>

          <tbody>{userList}</tbody>
        </table>
        <div className="conversation__button-container">
          <button
            onClick={(event) => {
              this.getUsers(event);
            }}
            className="conversation__user-list"
          >
            Connection
          </button>
          <Logout match={this.props} />
        </div>
        <div className="conversation__create-conversation-container">
          <button
            onClick={(event) => {
              this.addConversation(event);
            }}
            className="conversation__create-conversation"
          >
            Create Conversation
          </button>
        </div>
      </div>
    );
  }
}

export default Conversations;
