import axios from "axios";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import moment from "moment";
import "../Conversations/Conversations.scss";
const userURL = "http://localhost:8080/messages/";

export class Conversations extends Component {
  state = {
    conversations: [],
    userID: "",
  };

  componentDidMount() {
    axios.get(userURL + this.props.routerprops).then((response) => {
      console.log(response);
      this.setState({
        userID: this.props.routerprops,
        conversations: response.data,
      });
    });
  }
  render() {
    const userList = this.state.conversations.map((conversation, index) => {
      return (
        <Link
          className="conversation__link"
          to={"/messages/" + conversation.conversationid}
        >
          <tr
            className="conversation__group-info-sub"
            key={conversation.conversationid + index}
          >
            <td className="conversation__group-id">
              {conversation.conversationid}{" "}
            </td>
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
      <>
        <div className="conversation__header">
          Hello UserID , {this.props.routerprops}
        </div>
        <table className="conversation__table-main">
          <tr className="conversation__header-main">
            <th className="conversation__header-id-name">ConversationID</th>
            <th className="conversation__header-group-name">Group Name</th>
            <th className="conversation__header-group-created">
              Group Created On
            </th>
          </tr>
          {userList}
        </table>
      </>
    );
  }
}

export default Conversations;
