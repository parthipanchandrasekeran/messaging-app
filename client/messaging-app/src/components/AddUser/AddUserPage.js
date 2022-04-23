import React, { Component } from "react";
import axios from "axios";

const ADD_USER = "http://localhost:8080/users/";

export class AddUserPage extends Component {
  state = {
    username: "",
    userid: "",
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

    const newUser = {
      username: this.state.username,
      userid: this.state.userid,
    };
    axios
      .post(ADD_USER + this.getSessionID() + "/add-user", newUser)
      .then((response) => {
        console.log(response);
        this.setState({ username: "", userid: "" });
      });
  }
  render() {
    return (
      <div className="add-user__main">
        <h1 className="add-user__header-main">Add User Page</h1>
        <article className="add-user__user-add-details">
          <form
            onSubmit={(event) => {
              this.handleSubmit(event);
            }}
            className="add-user__form-main"
          >
            <label className="add-user__user-name-label">Enter Username</label>
            <input
              onChange={(event) => {
                this.onChangeUsername(event);
              }}
              type="text"
              value={this.state.username}
              className="add-user__user-name-input"
            ></input>
            <label className="add-user__user-id-label">Enter UserID</label>
            <input
              onChange={(event) => {
                this.onChangeuserid(event);
              }}
              type="text"
              value={this.state.userid}
              className="add-user__user-id-input"
            ></input>
            <button type="submit" className="add-user__send">
              Add New User
            </button>
          </form>
        </article>
      </div>
    );
  }
}

export default AddUserPage;
