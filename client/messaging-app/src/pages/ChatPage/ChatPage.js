import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import moment from "moment";
const userURL = "http://localhost:8080/messages/";

export class ChatPage extends Component {
  componentDidMount() {
    console.log(this.props.routerprops);
  }
  render() {
    return (
      <div className="chatpage__main">
        <h2 className="chatpage__header">
          Hello User, {this.props.routerprops.userid}
        </h2>
        <h2 className="chatpage__header">
          Conversation ID, {this.props.routerprops.conversationid}
        </h2>
        <div className="chatpage__messages-main"></div>
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
