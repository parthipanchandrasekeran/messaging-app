import logo from "./logo.svg";
import image from "./assets/images/pexels-eva-elijas-7641150.jpg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Conversations from "./pages/Conversations/Conversations";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          path="/users/:userid"
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
