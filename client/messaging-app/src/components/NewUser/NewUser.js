import React, { Component } from "react";
import LandingPage from "../../pages/LandingPage/LandingPage";

export class NewUser extends Component {
  state = {
    modalClose: false,
  };

  modalClose = () => {
    this.setState({ modalClose: true });
  };
  render() {
    if (this.state.modalClose === true) {
      return <LandingPage />;
    }
    return (
      <div className="newuserid-main">
        <div className="newuserid-main__sub-container">
          <div
            onClick={() => {
              this.modalClose();
            }}
            className="newuserid-main__close"
          >
            X
          </div>
          <p className="newuserid-main__display-text">
            NewUserID = {this.props.userid}
          </p>
        </div>
      </div>
    );
  }
}

export default NewUser;
