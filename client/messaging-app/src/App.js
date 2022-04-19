import logo from "./logo.svg";
import image from "./assets/images/pexels-eva-elijas-7641150.jpg";
import { io } from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Conversations from "./pages/Conversations/Conversations";
import UserPage from "./pages/UserPage/UserPage";
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
  const socket = io();
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />

        <Route
          path="/conversation/userpage/:userid"
          render={(RouterProps) => {
            return <UserPage routerprops={RouterProps.match.params.userid} />;
          }}
        />
        <Route
          path="/conversation/:userid"
          render={(RouterProps) => {
            return (
              <Conversations routerprops={RouterProps.match.params.userid} />
            );
          }}
        />
        <Route
          path="/:userid/conversation/:conversationid"
          render={(RouterProps) => {
            return <ChatPage routerprops={RouterProps.match.params} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
