import axios from "axios";
import React, { Component } from "react";
const userURL = "http://localhost:8080/messages/";

export class Conversations extends Component {
  state = {
    conversations: [],
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
        conversations: response.data,
      });
      console.log(this.state);
    });
  }
  render() {
    const userList = this.state.conversations.map((conversation, index) => {
      return (
        <div key={conversation.coversationid + index}>
          <h1>ConversationID - {conversation.conversationid} </h1>
          <h1>Conversation Group - {conversation.conversation} </h1>
          <h1>Created - {conversation.created} </h1>
        </div>
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
