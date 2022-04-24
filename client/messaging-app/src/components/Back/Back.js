import React from "react";
import { Route } from "react-router-dom";
import "../Back/Back.scss";

const Back = (props) => (
  <Route
    render={({ history }) => (
      <button
        className="logout"
        type="button"
        onClick={() => {
          history.push("/conversation/userpage/" + props.userid);
        }}
      >
        Back
      </button>
    )}
  />
);

export default Back;
