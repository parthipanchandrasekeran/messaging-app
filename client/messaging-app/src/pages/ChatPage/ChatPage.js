import axios from "axios";
import { io } from "socket.io-client";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import moment from "moment";
const userURL = "http://localhost:8080/messages/conversation/";
const messageURL = "http://localhost:8080/messages/add/";
const userInfoURL = "http://localhost:8080/users/";
const socket = io("http://localhost:4000");

export class ChatPage extends Component {
  state = {
    messages: [],
    currentMessage: "",
    userDetails: [],
  };

  getUserDetails = () => {
    axios.get(userInfoURL + this.props.routerprops.userid).then((response) => {
      this.setState({ userDetails: response.data });
    });
  };

  onChange = (event) => {
    this.setState({ currentMessage: event.target.value });
  };

  getMessages = () => {
    axios
      .get(userURL + this.props.routerprops.conversationid)
      .then((response) => {
        this.setState({ messages: response.data[0].conversations });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      userid: this.props.routerprops.userid,
      username: this.state.userDetails.username,
      message: this.state.currentMessage,
    };
    axios
      .post(messageURL + this.props.routerprops.conversationid, data)
      .then((response) => {
        this.setState({ currentMessage: "" });
        this.getMessages();
      });
  };
  componentDidMount() {
    socket.on("connect", (args) => {
      console.log(args);
    });
    this.getMessages();
    this.getUserDetails();
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
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}
          className="chatpage__message-input"
        >
          <input
            onChange={(event) => {
              this.onChange(event);
            }}
            type="text"
            value={this.state.currentMessage}
            className="chatpage__message-input-text"
          ></input>
          <button type="submit" className="chatpage__send">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default ChatPage;
