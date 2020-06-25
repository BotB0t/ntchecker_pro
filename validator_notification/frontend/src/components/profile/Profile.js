import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { update } from "../../actions/auth";
import { Link } from "react-router-dom";
import { createMessage } from "../../actions/messages";

export class Profile extends Component {
  state = {
    username: "",
    email: "",
    oldPassword: "",
    password: "",
    first_name: "",
  };

  static propTypes = {
    update: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  changeUsername = (e) => {
    e.preventDefault();
    var username = this.state.username.toLowerCase();

    if (username == "") {
      this.props.createMessage({
        emptyInput: "El campo nombre de usuario no puede estar vacío",
      });
    } else {
      const updateUser = {
        username,
      };
      console.log(updateUser);
      this.props.update(updateUser);
      this.setState((state) => ({ username: "" }));
    }
  };

  changeEmail = (e) => {
    e.preventDefault();
    var email = this.state.email;

    if (email == "") {
      this.props.createMessage({
        emptyInput: "El campo email no puede estar vacío",
      });
    } else {
      const updateUser = {
        email,
      };
      console.log(updateUser);
      //this.props.update(updateUser);
      this.setState((state) => ({ email: "" }));
    }
  };

  changePassword = (e) => {
    e.preventDefault();
    var password = this.state.password;
    var oldPassword = this.state.oldPassword;

    if (password == "") {
      this.props.createMessage({
        emptyInput: "El campo contraseña no puede estar vacío",
      });
    } else if (password == oldPassword) {
      this.props.createMessage({
        newPasswordMatchOld:
          "La nueva contraseña no puede ser la misma que la actual",
      });
    } else {
      const updateUser = {
        password,
      };
      console.log(updateUser);
      //this.props.update(updateUser);
      this.setState((state) => ({ password: "" }));
    }
  };

  changeFirstName = (e) => {
    e.preventDefault();
    var first_name = this.state.first_name;

    if (first_name == "") {
      this.props.createMessage({
        emptyInput: "El campo del nombre completo no puede estar vacío",
      });
    } else {
      const updateUser = {
        first_name,
      };
      console.log(updateUser);
      //this.props.update(updateUser);
      this.setState((state) => ({ email: "" }));
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { username, email, oldPassword, password, first_name } = this.state;

    const ButtonEditName = (
      <span className="pl-3 mt-2">
        <img
          src="https://image.flaticon.com/icons/svg/61/61456.svg"
          style={{ width: "15px", height: "15px" }}
          data-toggle="collapse"
          data-target="#collapseUsernameForm"
          aria-expanded="false"
          aria-controls="collapseUsernameForm"
        ></img>
        <div className="collapse mt-3" id="collapseUsernameForm">
          <div className="card card-body">
            <form onSubmit={this.changeUsername}>
              <div className="form-group">
                <label className="h6">
                  <span style={{ color: "red" }}>*</span>Nuevo nombre de
                  usuario.
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  onChange={this.onChange}
                  value={username}
                />
              </div>
              <hr></hr>
              <div className="form-group">
                <button type="submit" className="btn btn-accept">
                  Cambiar Nombre
                </button>
              </div>
            </form>
          </div>
        </div>
      </span>
    );

    const ButtonEditFullName = (
      <span className="pl-3">
        <img
          src="https://image.flaticon.com/icons/svg/61/61456.svg"
          style={{ width: "15px", height: "15px" }}
          data-toggle="collapse"
          data-target="#collapseFullNameForm"
          aria-expanded="false"
          aria-controls="collapseFullNameForm"
        ></img>
        <div className="collapse mt-3" id="collapseFullNameForm">
          <div className="card card-body">
            <form onSubmit={this.changeFirstName}>
              <div className="form-group">
                <label className="h6">
                  <span style={{ color: "red" }}>*</span>Nuevo nombre completo.
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="first_name"
                  onChange={this.onChange}
                  value={first_name}
                />
              </div>
              <hr></hr>
              <div className="form-group">
                <button type="submit" className="btn btn-accept">
                  Cambiar Nombre Completo
                </button>
              </div>
            </form>
          </div>
        </div>
      </span>
    );

    const ButtonEditEmail = (
      <span className="pl-3">
        <img
          src="https://image.flaticon.com/icons/svg/61/61456.svg"
          style={{ width: "15px", height: "15px" }}
          data-toggle="collapse"
          data-target="#collapseEmailForm"
          aria-expanded="false"
          aria-controls="collapseEmailForm"
        ></img>
        <div className="collapse mt-3" id="collapseEmailForm">
          <div className="card card-body">
            <form onSubmit={this.changeEmail}>
              <div className="form-group">
                <label className="h6">
                  <span style={{ color: "red" }}>*</span>Nuevo email
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                />
              </div>
              <hr></hr>
              <div className="form-group">
                <button type="submit" className="btn btn-accept">
                  Cambiar Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </span>
    );

    const ButtonEditPassword = (
      <span className="pl-3">
        <img
          src="https://image.flaticon.com/icons/svg/61/61456.svg"
          style={{ width: "15px", height: "15px" }}
          data-toggle="collapse"
          data-target="#collapsePwdForm"
          aria-expanded="false"
          aria-controls="collapsePwdForm"
        ></img>
        <div className="collapse mt-3" id="collapsePwdForm">
          <div className="card card-body">
            <form onSubmit={this.changePassword}>
              <div className="form-group mt-2">
                <label className="h6">
                  <span style={{ color: "red" }}>*</span>Contraseña Actual.
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="oldPassword"
                  onChange={this.onChange}
                  value={oldPassword}
                />
              </div>
              <div className="form-group">
                <label className="h6">
                  <span style={{ color: "red" }}>*</span>Nueva Contraseña.
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                />
              </div>
              <hr></hr>
              <div className="form-group">
                <button type="submit" className="btn btn-accept">
                  Cambiar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </span>
    );

    return (
      <div>
        <div className="mt-5">
          <h1>
            Perfil de <strong>{user.username}</strong>
          </h1>

          <Link to="/profile-info/devices" className="btn btn-accept mt-3 mb-2">
            Dispositivos
          </Link>
        </div>
        <hr></hr>
        <div className="container mt-4">
          <h3 className="mt-3">
            <strong>Usuario:</strong>&nbsp;
            <span className="h4 pl-2">
              {user.username}
              {ButtonEditName}
            </span>
          </h3>
          <h3 className="mt-3">
            <strong>Nombre completo:</strong>&nbsp;
            <span className="h4 pl-2">
              {user.first_name}
              {ButtonEditFullName}
            </span>
          </h3>
          <h3 className="mt-3">
            <strong>Correo electrónico:</strong>&nbsp;
            <span className="h4 pl-2">
              {user.email}
              {ButtonEditEmail}
            </span>
          </h3>
          <h3 className="mt-3">
            <strong>Contraseña:</strong>&nbsp;
            <span className="h4 pl-2">Placeholder{ButtonEditPassword}</span>
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { update, createMessage })(Profile);
