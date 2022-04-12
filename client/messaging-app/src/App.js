import logo from "./logo.svg";
import image from "./assets/images/pexels-eva-elijas-7641150.jpg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          path="/users/:userid"
          render={(RouterProps) => {
            return <HomePage routerprops={RouterProps.match.params.userid} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
