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
          <label className="loginSubmission__username animate__animated animate__bounceInRight">
            Enter UserID
          </label>
          <input
            ref={this.inputRef}
            value={this.state.userid}
            onChange={(event) => {
              this.onChangeUserid(event);
            }}
            type="text"
            className="loginSubmission__username-input"
          ></input>
          <label className="loginSubmission__password animate__animated animate__bounceInRight">
            Enter Password
          </label>
          <input
            value={this.state.password}
            onChange={(event) => {
              this.onChangePassword(event);
            }}
            type="password"
            className="loginSubmission__password-input"
          ></input>
          <div className="loginSubmission__button-container ">
            <button
              type="submit"
              className="loginSubmission__login animate__animated animate__bounceInRight "
            >
              Login
            </button>
            <button
              type="button"
              onClick={(event) => {
                this.createNewUser();
              }}
              className="loginSubmission__cancel animate__animated animate__bounceInRight"
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
