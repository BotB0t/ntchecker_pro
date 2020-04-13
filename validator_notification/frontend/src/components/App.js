import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import LayoutDevices from "./devices/LayoutDevices";
import LayoutNotifications from "./notifications/LayoutNotifications";
import LayoutGeneral from "./dashboard/LayoutGeneral";
import LayoutDashboard from "./dashboard/LayoutDashboard";
import LayoutFormNotifications from "./notifications/LayoutFormNotifications";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import About from "./about/About";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// ALERTS OPTIONS
const alertOptions = {
  timeout: 3000,
  position: positions.TOP_CENTER,
  offset: "30px",
  transition: transitions.SCALE,
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute
                    exact
                    path="/profile-info/devices"
                    component={LayoutDevices}
                  />
                  <PrivateRoute
                    exact
                    path="/"
                    component={LayoutNotifications}
                  />
                  <PrivateRoute
                    exact
                    path="/data/dashboard"
                    component={LayoutGeneral}
                  />
                  <PrivateRoute
                    path="/data/dashboard/:id"
                    component={LayoutDashboard}
                  />
                  <PrivateRoute
                    path="/data/notification/general"
                    component={LayoutFormNotifications}
                  />
                  {/* <Route exact path="/register" component={Register} /> */}
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/about" component={About} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
