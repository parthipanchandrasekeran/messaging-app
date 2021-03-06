import logo from "./logo.svg";
import image from "./assets/images/pexels-eva-elijas-7641150.jpg";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Conversations from "./pages/Conversations/Conversations";
import UserPage from "./pages/UserPage/UserPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import AddUserPage from "./components/AddUser/AddUserPage";
import CreateConversation from "./components/CreateConversation/CreateConversation";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />

        <Route
          path="/conversation/userpage/:userid"
          render={(RouterProps) => {
            return (
              <UserPage
                routerprops={RouterProps.match.params.userid}
                match={RouterProps.match}
              />
            );
          }}
        />
        <Route
          exact
          path="/userpage/add-user"
          render={(RouterProps) => {
            return (
              <AddUserPage
                routerprops={RouterProps}
                match={RouterProps.match}
              />
            );
          }}
        />
        <Route
          exact
          path="/conversation/create-conversation"
          render={(RouterProps) => {
            return (
              <CreateConversation
                routerprops={RouterProps}
                match={RouterProps.match}
              />
            );
          }}
        />
        <Route
          path="/conversation/:userid"
          render={(RouterProps) => {
            return (
              <Conversations
                routerprops={RouterProps.match.params.userid}
                match={RouterProps.match}
              />
            );
          }}
        />
        <Route
          path="/:userid/conversation/:conversationid"
          render={(RouterProps) => {
            return (
              <ChatPage
                routerprops={RouterProps.match.params}
                match={RouterProps.match}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
