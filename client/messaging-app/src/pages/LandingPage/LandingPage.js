import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import LoginIcon from "../../assets/icons/icons8-ok-64.svg";
import "animate.css";
import "../LandingPage/LandingPage.scss";
import NewUser from "../../components/NewUser/NewUser.js";
import landing from "../../assets/images/LandingPage-main.gif";
const userURL = "http://localhost:8080/users/";
const newUserURL = "http://localhost:8080/users/newuser/";

export class LandingPage extends Component {
  state = {
    userid: "",
    password: "",
    submit: "false",
    usersAdded: "",
    newUserID: false,
  };

  inputRef = React.createRef();

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.userid !== "" && this.state.password !== "") {
      axios
        .post(userURL + this.state.userid, {
          password: this.state.password,
        })
        .then((response) => {
          sessionStorage.userid = this.state.userid;
          this.setState({ usersAdded: response.data.userAdded, submit: true });
        })
        .catch((e) => {
          if (e.response.status === 400) {
            alert(
              "Invalid ID/Password!! Please enter correct ID/Password or create New ID"
            );
          }
        });
    } else {
      alert("Please Enter Correct ID/Password");
    }
  }

  createNewUser() {
    this.setState({
      newUserID: true,
    });
  }

  onChangeUserid(event) {
    this.setState({
      userid: event.target.value,
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    if (this.state.submit === true) {
      return <Redirect to={"/conversation/" + this.state.userid} />;
    }

    if (this.state.newUserID === true) {
      return <NewUser />;
    }
    return (
      <div className="loginsubmission-main">
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}
          className="loginSubmission"
        >
          <div className="loginSubmission__header-container">
            <img
              src={landing}
              alt="landing"
              className="loginSubmission__gif-image"
            />
            <h2 className="loginSubmission__header-text">
              Hey, Enter your details to get sign in to your account
            </h2>
          </div>
          <div className="loginSubmission__username-input-container">
            <input
              ref={this.inputRef}
              value={this.state.userid}
              onChange={(event) => {
                this.onChangeUserid(event);
              }}
              type="text"
              placeholder="ENTER YOUR USERID"
              className="loginSubmission__username-input"
            ></input>
          </div>
          <div className="loginSubmission__password-input-container">
            <input
              value={this.state.password}
              onChange={(event) => {
                this.onChangePassword(event);
              }}
              type="password"
              placeholder="PASSWORD"
              className="loginSubmission__password-input"
            ></input>
          </div>
          <div className="loginSubmission__button-container ">
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LandingPage;
