import logo from "./logo.svg";
import image from "./assets/images/pexels-eva-elijas-7641150.jpg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Conversations from "./pages/Conversations/Conversations";
import UserPage from "./pages/UserPage/UserPage";

function App() {
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
      </Switch>
    </Router>
  );
}

export default App;
