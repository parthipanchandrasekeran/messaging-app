import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import Logout from "../Logout/Logout";
import Back from "../Back/Back";
import "../AddUser/AddUserPage.scss";

const ADD_USER = "https://par-chat-ap-server-v1.herokuapp.com/users/";

export class AddUserPage extends Component {
  state = {
    username: "",
    userid: "",
    userPage: false,
  };

  onChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  getSessionID = () => {
    return sessionStorage?.userid;
  };

  onChangeuserid(event) {
    this.setState({
      userid: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.username && this.state.userid) {
      const newUser = {
        username: this.state.username,
        userid: this.state.userid,
      };
      axios
        .post(ADD_USER + this.getSessionID() + "/add-user", newUser)
        .then((response) => {
          console.log(response);
          this.setState({ username: "", userid: "", userPage: true });
        });
    } else {
      alert("Please enter valid information");
    }
  }
  render() {
    if (this.state.userPage === true) {
      return <Redirect to={"/conversation/userpage/" + this.getSessionID()} />;
    }
    return (
      <div className="add-user__main">
        <div className="add-user__form-modal-container">
          <h1 className="add-user__header-main">Add New Connections</h1>
          <article className="add-user__user-add-details">
            <form
              onSubmit={(event) => {
                this.handleSubmit(event);
              }}
              className="add-user__form-main"
            >
              <div className="add-user__form-container">
                <div className="add-user__user-name-container">
                  <label className="add-user__user-name-label">
                    Enter Name
                  </label>
                  <input
                    onChange={(event) => {
                      this.onChangeUsername(event);
                    }}
                    type="text"
                    placeholder="Name"
                    value={this.state.username}
                    className="add-user__user-name-input"
                  ></input>
                </div>
                <div className="add-user__user-id-container">
                  <label className="add-user__user-id-label">
                    Enter UserID
                  </label>
                  <input
                    onChange={(event) => {
                      this.onChangeuserid(event);
                    }}
                    type="text"
                    placeholder="UserID"
                    value={this.state.userid}
                    className="add-user__user-id-input"
                  ></input>
                </div>
              </div>
              <button type="submit" className="add-user__send">
                Add New User
              </button>
            </form>
            <div className="add-user__nav-button-container">
              <Logout />
              <Back
                userid={this.getSessionID()}
                path={"/conversation/userpage/"}
              />
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default AddUserPage;
