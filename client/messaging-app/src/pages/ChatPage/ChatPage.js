import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import moment from "moment";
const userURL = "http://localhost:8080/messages/";

export class ChatPage extends Component {
  state = {
    messages: [],
  };

  getMessages = () => {
    axios
      .get(userURL + this.props.routerprops.conversationid)
      .then((response) => {
        this.setState({ messages: response.data[0].conversations });
        console.log(this.state.messages);
      });
  };
  componentDidMount() {
    this.getMessages();
    console.log(this.props.routerprops);
  }
  render() {
    const messageList = this.state.messages.map((message, index) => {
      const userIDMatch = "left";
      const userIDNoMatch = "right";
      if (message.userid === this.props.routerprops.userid) {
        return (
          <div key={index} className={"messagelist__main--" + userIDMatch}>
            <h2 className="messagelist__message">{message.message}</h2>
            <p className="messagelist__username">{message.username}</p>
            <p className="messagelist__timestamp">
              {moment(message.timestamp).format("DD/MM,HH:MM")}
            </p>
          </div>
        );
      } else {
        return (
          <div key={index} className={"messagelist__main--" + userIDNoMatch}>
            <h2 className="messagelist__message">{message.message}</h2>
            <p className="messagelist__username">{message.username}</p>
            <p className="messagelist__timestamp">
              {moment(message.timestamp).format("DD/MM,HH:MM")}
            </p>
          </div>
        );
      }
    });
    return (
      <div className="chatpage__main">
        <h2 className="chatpage__header">
          Hello User, {this.props.routerprops.userid}
        </h2>
        <h2 className="chatpage__header">
          Conversation ID, {this.props.routerprops.conversationid}
        </h2>
        <div className="chatpage__messages-main">{messageList}</div>
        <form className="chatpage__message-input">
          <input type="text" className="chatpage__message-input-text"></input>
          <button type="submit" className="chatpage__send">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default ChatPage;
