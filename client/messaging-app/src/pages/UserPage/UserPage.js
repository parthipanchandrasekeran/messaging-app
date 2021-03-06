import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../UserPage/UserPage.scss";
import moment from "moment";
import axios from "axios";
import Logout from "../../components/Logout/Logout";
import AddUserPage from "../../components/AddUser/AddUserPage";
import back from "../../assets/icons/icons8-back.svg";

const userURL = "https://par-chat-ap-server-v1.herokuapp.com/users/";

export class UserPage extends Component {
  state = {
    userAdded: [],
    conversationPage: false,
    addUserPage: false,
    currentValue: "",
    connectionCount: null,
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
      this.setState({
        userAdded: response.data.userAdded,
        addUserPage: false,
        connectionCount: response.data.userAdded.length,
      });
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
        <div className="user__table-main">
          <div className="user__table-first-section">
            <div className="user__header-section">
              <img
                src={back}
                alt="back-button"
                onClick={(event) => {
                  this.getConversationPage(event);
                }}
                className="user__button-top"
              />

              <div className="user__header">USERID - {this.getSessionID()}</div>
            </div>

            <div className="user__header-groups-connections-container">
              <div className="user__header-groups-container">
                <h2 className="user__header-groups-heading">GROUPS -</h2>
              </div>
              <div className="user__header-connections-container">
                <h2 className="user__header-connections-heading">
                  CONNECTIONS - {this.state.connectionCount}
                </h2>
              </div>
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
                <h1 className="user__user-name-header">User Name</h1>
                <h1 className="user__user-created-header">Connected On</h1>
                <h1 className="user__user-id-header">UserID</h1>
              </div>
              <div className="user__table-main-sub">{users}</div>
            </div>
          </div>
          <div className="user__footer-option">
            <section className="user__footer-sub-section">
              <div className="user__footer-start">
                <div
                  onClick={(event) => {
                    this.getConversationPage(event);
                  }}
                  className="user__button"
                >
                  Start conversation
                </div>
                <div
                  onClick={(event) => {
                    this.getAdduserPage(event);
                  }}
                  className="user__button"
                >
                  Add Connection
                </div>
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
