import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../UserPage/UserPage.scss";
import moment from "moment";
import axios from "axios";
import Logout from "../../components/Logout/Logout";
import AddUserPage from "../../components/AddUser/AddUserPage";

const userURL = "http://localhost:8080/users/";

export class UserPage extends Component {
  state = {
    userAdded: [],
    conversationPage: false,
    addUserPage: false,
    currentValue: "",
  };

  getSessionID = () => {
    return sessionStorage?.userid;
  };

  onChange = (event) => {
    this.setState({ currentValue: event.target.value });
  };

  getAdduserPage = () => {
    this.setState({ addUserPage: true });
  };

  getConversationPage = (event) => {
    event.preventDefault();
    this.setState({ conversationPage: true });
  };

  getUserList = () => {
    axios.put(userURL + this.getSessionID()).then((response) => {
      this.setState({ userAdded: response.data.userAdded, addUserPage: false });
      console.log(this.state.userAdded);
    });
  };
  componentDidMount() {
    this.getUserList();
  }

  render() {
    console.log(this.state.currentValue);
    if (this.state.addUserPage === true) {
      return <Redirect to={"/userpage/add-user"} />;
    }
    if (this.state.conversationPage === true) {
      return <Redirect to={"/conversation/" + this.getSessionID()} />;
    }
    const users = this.state.userAdded.map((user, index) => {
      if (this.state.currentValue === "") {
        return (
          <div className="user__info-table-row" key={user.userid + index}>
            <h2 className="user__user-name">{user.username} </h2>
            <h2 className="user__user-created">
              {moment(user.created).format("DD/MM/YYYY")}
            </h2>
            <h2 className="user__user-id">{user.userid} </h2>
          </div>
        );
      } else if (this.state.currentValue !== "") {
        if (
          user.username
            .toLowerCase()
            .includes(this.state.currentValue.toLowerCase())
        ) {
          return (
            <div className="user__info-table-row" key={user.userid + index}>
              <h2 className="user__user-name">{user.username} </h2>
              <h2 className="user__user-created">
                {moment(user.created).format("DD/MM/YYYY")}
              </h2>
              <h2 className="user__user-id">{user.userid} </h2>
            </div>
          );
        } else {
          return false;
        }
      }
    });
    return (
      <div className="user__main-container">
        <div className="user__button-container">
          <button
            onClick={(event) => {
              this.getAdduserPage(event);
            }}
            className="user__add-button"
          >
            Add
          </button>
        </div>

        <div className="user__table-main">
          <div className="user__table-first-section">
            <div className="user__header-section">
              <button
                onClick={(event) => {
                  this.getConversationPage(event);
                }}
                className="user__button"
              >
                Back
              </button>
              <div className="user__header">UserID, {this.getSessionID()}</div>
            </div>
            <div className="user__header-main-primary">
              <h2 className="user__header-text">my connections</h2>
            </div>
            <div className="user__search-main">
              <input
                onChange={(e) => {
                  this.onChange(e);
                }}
                className="user__input-field"
                placeholder="SEARCH"
              ></input>
            </div>
            <div className="user__table-main-container">
              <div className="user__header-main">
                <h1 className="user__user-name">User Name</h1>
                <h1 className="user__user-created">Connected On</h1>
                <h1 className="user__user-id">UserID</h1>
              </div>
              <div className="user__table-main-sub">{users}</div>
            </div>
          </div>
          <div className="user__footer-option">
            <section className="user__footer-sub-section">
              <div className="user__footer-start">
                <button
                  onClick={(event) => {
                    this.getConversationPage(event);
                  }}
                  className="user__button"
                >
                  Start conversation
                </button>
              </div>
            </section>
          </div>
        </div>
        <div className="user__logout-main">
          <Logout />
        </div>
      </div>
    );
  }
}

export default UserPage;
