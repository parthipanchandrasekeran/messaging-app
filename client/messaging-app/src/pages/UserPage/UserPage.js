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
  };

  getSessionID = () => {
    return sessionStorage?.userid;
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
    if (this.state.addUserPage === true) {
      return <Redirect to={"/userpage/add-user"} />;
    }
    if (this.state.conversationPage === true) {
      return <Redirect to={"/conversation/" + this.getSessionID()} />;
    }
    const users = this.state.userAdded.map((user, index) => {
      return (
        <tr className="user__info-table-row" key={user.userid + index}>
          <td className="user__user-name">{user.username} </td>
          <td className="user__user-created">
            {moment(user.created).format("DD/MM/YYYY")}
          </td>
          <td className="user__user-id">{user.userid} </td>
        </tr>
      );
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

        <div className="user__header">UserID, {this.getSessionID()}</div>
        <table className="user__table-main">
          <div className="user__header-main">
            <h2 className="user__header-text">my connections</h2>
          </div>
          <div className="user__search-main">
            <input className="user__input-field" placeholder="search"></input>
          </div>
          <tr className="user__header-main">
            <th className="user__user-name">User Name</th>
            <th className="user__user-created">Connected On</th>
            <th className="user__user-id">UserID</th>
          </tr>
          {users}
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
        </table>
        <div className="user__logout-main">
          <Logout />
        </div>
      </div>
    );
  }
}

export default UserPage;
