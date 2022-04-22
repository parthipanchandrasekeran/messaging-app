import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "animate.css";
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

  inputRef = React.createRef();

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.userid !== "") {
      axios
        .get(userURL + this.state.userid)
        .then((response) => {
          sessionStorage.userid = this.state.userid;
          this.setState({ usersAdded: response.data.userAdded, submit: true });
        })
        .catch((e) => {
          if (e.response.status === 400) {
            alert("Invalid ID Please enter correct ID or create New ID");
          }
        });
    } else {
      alert("Please Enter Correct ID");
    }
  }

  createNewUser() {
    const newUser = { username: "Parth" };

    axios.post(newUserURL, newUser).then((response) => {
      this.setState({
        newUserIDCreated: response.data.userid,
        newUserID: true,
      });
    });
  }

  onChange(event) {
    this.setState({ userid: event.target.value });
  }

  render() {
    if (this.state.submit === true) {
      return <Redirect to={"/conversation/" + this.state.userid} />;
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
          <label className="loginSubmission__username animate__animated animate__bounceInRight">
            Enter UserID Below
          </label>
          <input
            ref={this.inputRef}
            value={this.state.userid}
            onChange={(event) => {
              this.onChange(event);
            }}
            type="text"
            className="loginSubmission__username-input"
          ></input>
          <div className="loginSubmission__button-container ">
            <button type="submit" className="loginSubmission__login ">
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
