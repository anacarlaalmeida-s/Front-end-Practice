import "./App.css";
import LoginDisplay from "./pages/LoginDisplay/LoginDisplay";
import RegisterDisplay from "./pages/RegisterDisplay/RegisterDisplay";
import Home from "./pages/Home/Home";
import { AuthProvider, Context } from "./Context/AuthContext";
import { ContactProvider} from "./Context/ContactContext";
import { useContext } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function PrivateRoute(props) {
  const { token } = useContext(Context);

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AuthProvider>
            <Route path="/" exact component={LoginDisplay} />
            <Route path="/sign-up" component={RegisterDisplay} />
            <ContactProvider>
              <PrivateRoute>
                <Route path="/home" component={Home} />
              </PrivateRoute>
            </ContactProvider>
          </AuthProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
