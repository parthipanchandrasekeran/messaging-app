import React, { Component } from "react";
import axios from "axios";
import Back from "../Back/Back";
import "../CreateConversation/CreateConversation.scss";
import { Redirect } from "react-router";
const POST_URL = "http://localhost:8080/messages/";

export class CreateConversation extends Component {
  state = {
    groupName: "",
    subUserId: "",
    conversationPage: false,
  };

  inputRef = React.createRef();

  getSessionID = () => {
    return sessionStorage?.userid;
  };

  onChangeGroupName(event) {
    this.setState({
      groupName: event.target.value,
    });
    console.log(event.target.value);
  }

  onChangesubUserId(event) {
    this.setState({
      subUserId: event.target.value,
    });
    console.log(event.target.value);
  }

  componentDidMount() {
    this.inputRef.current.focus();
    this.setState({ conversationPage: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.groupName && this.state.subUserId) {
      console.log("submit");
      const conversation = {
        group: this.state.groupName,
        subuserid: this.state.subUserId,
      };
      console.log(conversation);
      axios
        .post(POST_URL + this.getSessionID(), conversation)
        .then((response) => {
          console.log(response);
          this.setState({
            groupName: "",
            subUserId: "",
            conversationPage: true,
          });
        });
    } else {
      alert("Please Enter Mandatory/Valid info");
    }
  }
  render() {
    if (this.state.conversationPage) {
      return <Redirect to={"/conversation/" + this.getSessionID()} />;
    }
    return (
      <div className="create-conversation__main">
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}
          className="create-conversation__form"
        >
          <div className="create-conversation__button-container-groupname">
            <label className="create-conversation__group-name animate__animated animate__bounceInRight">
              Enter Group Name
            </label>
            <input
              ref={this.inputRef}
              value={this.state.groupName}
              onChange={(event) => {
                this.onChangeGroupName(event);
              }}
              type="text"
              className="create-conversation__group-name-input"
            ></input>
          </div>
          <div className="create-conversation__button-container-subuderid">
            <label className="create-conversation__sub-user-id animate__animated animate__bounceInRight">
              Enter Sub User ID
            </label>
            <input
              value={this.state.subUserId}
              onChange={(event) => {
                this.onChangesubUserId(event);
              }}
              type="text"
              className="create-conversation__sub-user-id-input"
            ></input>
          </div>
          <div className="create-conversation__button-container ">
            <button
              type="button"
              onClick={(event) => {
                this.handleSubmit(event);
              }}
              className="loginSubmission__cancel animate__animated animate__bounceInRight"
            >
              Add Conversation
            </button>
          </div>
        </form>
        <Back userid={this.getSessionID()} path={"/conversation/"} />
      </div>
    );
  }
}

export default CreateConversation;
