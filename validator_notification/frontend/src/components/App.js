import React, { Component, Fragment } from "react";
import { render } from "react-dom";

import Header from "./layout/Header";
import Dashboard from "./users/Dashboard";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <Dashboard />
        </div>
      </Fragment>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
