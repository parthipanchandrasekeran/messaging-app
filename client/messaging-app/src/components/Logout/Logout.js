import React from "react";
import { Route } from "react-router-dom";
import "../Logout/Logout.scss";

const Logout = () => (
  <Route
    render={({ history }) => (
      <button
        className="logout"
        type="button"
        onClick={() => {
          sessionStorage.removeItem("userid");
          history.push("/");
        }}
      >
        Logout
      </button>
    )}
  />
);

export default Logout;
