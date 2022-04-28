import axios from "axios";
import React, { Component } from "react";
import LandingPage from "../../pages/LandingPage/LandingPage";
import "../NewUser/NewUser.scss";
import close from "../../assets/icons/icons8-close.svg";

const userURL = "http://localhost:8080/users/newuser";

export class NewUser extends Component {
  state = {
    modalClose: false,
    name: "",
    password: "",
    userid: "",
  };

  registerUser = () => {
    const userDetails = {
      username: this.state.name,
      password: this.state.password,
    };
    axios.post(userURL, userDetails).then((response) => {
      console.log(response.data.userid);
      this.setState({ userid: response.data.userid });
    });
  };

  inputRef = React.createRef();

  onChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.name !== "" && this.state.password !== "") {
      this.registerUser();
      this.setState({
        name: "",
        password: "",
      });
    } else {
      alert("Please fill the mandatory Information");
    }
  }

  modalClose = () => {
    this.setState({ modalClose: true });
  };

  componentDidMount() {
    this.inputRef.current.focus();
  }
  render() {
    if (this.state.modalClose === true) {
      return <LandingPage />;
    }

    return (
      <div className="newuserid-main__parent">
        <div className="newuserid-main">
          <p className="newuserid-main__display-text">
            NewUserID - {this.state.userid}
          </p>
          <div className="newuserid-main__sub-container">
            <div className="newuserid-main__close-container">
              <img
                className="newuserid-main__close"
                src={close}
                alt="close icon"
                onClick={() => {
                  this.modalClose();
                }}
              />
            </div>
            <form
              onSubmit={(event) => {
                this.handleSubmit(event);
              }}
              className="new-user"
            >
              <div className="new-user__name-main">
                <label className="new-user__name">Enter Name</label>
                <input
                  ref={this.inputRef}
                  value={this.state.name}
                  onChange={(event) => {
                    this.onChangeName(event);
                  }}
                  type="text"
                  className="new-user__name-input"
                ></input>
              </div>
              <div className="new-user__password-main">
                <label className="new-user__password">Enter Password</label>
                <input
                  value={this.state.password}
                  onChange={(event) => {
                    this.onChangePassword(event);
                  }}
                  type="password"
                  className="new-user__password-input"
                ></input>
              </div>
              <div className="new-user__submit-container">
                <button type="submit" className="new-user__submit ">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUser;
