import axios from "axios";
import { io } from "socket.io-client";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import moment from "moment";
import "../ChatPage/ChatPage.scss";
import Logout from "../../components/Logout/Logout";
const userURL =
  "https://par-chat-ap-server-v1.herokuapp.com/messages/conversation/";
const messageURL = "https://par-chat-ap-server-v1.herokuapp.com/messages/add/";
const userInfoURL = "https://par-chat-ap-server-v1.herokuapp.com/users/";
const socket = io("https://par-chat-ap-server-v1.herokuapp.com/");

export class ChatPage extends Component {
  state = {
    messages: [],
    currentMessage: "",
    userDetails: [],
    conversationPage: false,
    conversationName: "",
  };

  scrollRef = React.createRef();

  scrollToBottom = () => {
    this.scrollRef.current.scrollIntoView();
  };

  getSessionID = () => {
    return sessionStorage?.userid;
  };
  getUserDetails = () => {
    console.log("Get user Info");
    axios.put(userInfoURL + this.getSessionID()).then((response) => {
      this.setState({ userDetails: response.data });
    });
  };

  getConversationPage = (event) => {
    event.preventDefault();
    this.setState({ conversationPage: true });
  };

  onChange = (event) => {
    this.setState({ currentMessage: event.target.value });
  };

  getMessages = () => {
    axios
      .get(userURL + this.props.routerprops.conversationid)
      .then((response) => {
        console.log(response);
        this.setState({
          messages: response.data[0].conversations,
          conversationName: response.data[0].conversation,
        });
        this.scrollToBottom();
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.currentMessage === "") {
      alert("Enter Some Text");
    } else {
      const data = {
        userid: this.getSessionID(),
        username: this.state.userDetails.username,
        message: this.state.currentMessage,
      };
      axios
        .post(messageURL + this.props.routerprops.conversationid, data)
        .then((response) => {
          this.setState({ currentMessage: "" });
          socket.on("new-message", (args) => {});
          this.getMessages();
        });
    }
  };
  componentDidMount() {
    this.getMessages();
    this.getUserDetails();
  }

  componentDidUpdate(prevprops) {
    socket.on("new-message", (args) => {
      if (prevprops.routerprops.conversationid === args) {
        this.getMessages();
      }
    });
  }
  render() {
    console.log(this.state);
    if (this.state.conversationPage === true) {
      return <Redirect to={"/conversation/" + this.state.userDetails.userid} />;
    }
    const messageList = this.state.messages.map((message, index) => {
      const userIDMatch = "left";
      const userIDNoMatch = "right";
      if (message.userid === this.getSessionID()) {
        return (
          <div key={index} className={"messagelist__main--" + userIDMatch}>
            <h2 className="messagelist__message">{message.message}</h2>
            <p className="messagelist__username-timestamp">
              {message.username} -{" "}
              {moment(message.timestamp).format("DD/MM,HH:MM")}
            </p>
          </div>
        );
      } else {
        return (
          <div key={index} className={"messagelist__main--" + userIDNoMatch}>
            <h2 className="messagelist__message">{message.message}</h2>
            <p className="messagelist__username-timestamp">
              {" "}
              {message.username} -{" "}
              {moment(message.timestamp).format("DD/MM,HH:MM")}
            </p>
          </div>
        );
      }
    });
    return (
      <div className="chatpage__main">
        <div className="chatpage__username-header-container">
          <h2 className="chatpage__header">
            Hey {this.state.userDetails.username} !!
          </h2>
        </div>
        <div className="chatpage__group-header-container">
          <h2 className="chatpage__header">
            Welcome to Group - {this.state.conversationName}
          </h2>
        </div>
        <div className="chatpage__button-container">
          <button
            onClick={(event) => {
              this.getConversationPage(event);
            }}
            className="chatpage__back-button"
          >
            Back
          </button>
          <Logout />
        </div>
        <div className="chatpage__messages-main">
          {messageList}
          <div ref={this.scrollRef} className="chatpage__message_bottom"></div>
        </div>
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
