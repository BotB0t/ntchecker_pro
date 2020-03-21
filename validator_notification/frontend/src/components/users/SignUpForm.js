import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addUser } from "../../actions/users";

export class SignUpForm extends Component {
  state = {
    username: "",
    email: ""
  };

  static propTypes = {
    addUser: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { username, email } = this.state;
    const user = { username, email };
    this.props.addUser(user);
    this.setState({
      username: "",
      email: ""
    });
  };

  render() {
    const { username, email } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h1>Registrarse</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>USUARIO (ofidona)</label>
            <input
              className="form-control"
              type="text"
              name="username"
              onChange={this.onChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <label>EMAIL</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addUser })(SignUpForm);
