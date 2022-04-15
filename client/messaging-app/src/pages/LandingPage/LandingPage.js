import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../LandingPage/LandingPage.scss";
import NewUser from "../../components/NewUser/NewUser.js";
const userURL = "http://localhost:8080/users/";
const newUserURL = "http://localhost:8080/users/newuser/";

export class LandingPage extends Component {
  state = {
    userid: "",
    submit: "false",
    usersAdded: "",
    newUserID: false,
    newUserIDCreated: "",
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log(userURL + this.state.userid);
    axios.get(userURL + this.state.userid).then((response) => {
      this.setState({ usersAdded: response.data.userAdded, submit: true });
      console.log(this.state);
      localStorage.setItem("userid", this.state.userid);
    });
  }

  createNewUser() {
    const newUser = { username: "Parth" };

    axios.post(newUserURL, newUser).then((response) => {
      console.log(response);
      this.setState({
        newUserIDCreated: response.data.userid,
        newUserID: true,
      });
    });
  }

  onChange(event) {
    console.log(event.target.value);
    this.setState({ userid: event.target.value });
  }

  render() {
    if (this.state.submit === true) {
      return <Redirect to={"/users/" + this.state.userid} />;
    }

    if (this.state.newUserID === true) {
      return <NewUser userid={this.state.newUserIDCreated} />;
    }
    return (
      <div className="loginsubmission-main">
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}
          className="loginSubmission"
        >
          <label className="loginSubmission__username">
            Enter UserID Below
          </label>
          <input
            value={this.state.userid}
            onChange={(event) => {
              this.onChange(event);
            }}
            type="text"
            className="loginSubmission__username-input"
          ></input>
          <div className="loginSubmission__button-container">
            <button type="submit" className="loginSubmission__login">
              Login
            </button>
            <button
              type="button"
              onClick={(event) => {
                this.createNewUser();
              }}
              className="loginSubmission__cancel"
            >
              New UserID
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LandingPage;
