import React, { Component } from "react";
import axios from "axios";
const userURL = "http://localhost:8080/users/";

export class LandingPage extends Component {
  state = {
    userid: "",
    usersAdded: "",
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log(userURL + this.state.userid);
    axios.get(userURL + this.state.userid).then((response) => {
      this.setState({ usersAdded: response.data.userAdded });
      console.log(this.state);
    });

    //this.setState({ userid: "" });
  }

  onChange(event) {
    console.log(event.target.value);
    this.setState({ userid: event.target.value });
  }

  render() {
    return (
      <form
        onSubmit={(event) => {
          this.handleSubmit(event);
        }}
        className="loginSubmission"
      >
        <label className="loginSubmission__username">Username</label>
        <input
          onChange={(event) => {
            this.onChange(event);
          }}
          type="text"
          className="loginSubmission__username-input"
        ></input>
        <button type="submit" className="loginSubmission__login">
          LOGIN
        </button>
        <button type="submit" className="loginSubmission__login">
          CANCEL
        </button>
      </form>
    );
  }
}

export default LandingPage;
