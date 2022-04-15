import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../LandingPage/LandingPage.scss";
const userURL = "http://localhost:8080/users/";

export class LandingPage extends Component {
  state = {
    userid: "",
    submit: "false",
    usersAdded: "",
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log(userURL + this.state.userid);
    axios.get(userURL + this.state.userid).then((response) => {
      this.setState({ usersAdded: response.data.userAdded, submit: true });
      console.log(this.state);
    });

    //this.setState({ userid: "" });
  }

  onChange(event) {
    console.log(event.target.value);
    this.setState({ userid: event.target.value });
  }

  render() {
    if (this.state.submit === true) {
      return <Redirect to={"/users/" + this.state.userid} />;
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
            Enter Username Below
          </label>
          <input
            onChange={(event) => {
              this.onChange(event);
            }}
            type="text"
            className="loginSubmission__username-input"
          ></input>
          <div className="loginSubmission__button-container">
            <button type="submit" className="loginSubmission__login">
              LOGIN
            </button>
            <button type="submit" className="loginSubmission__login">
              CANCEL
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LandingPage;
