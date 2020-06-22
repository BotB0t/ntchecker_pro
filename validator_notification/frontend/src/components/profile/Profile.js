import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";

export class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

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
            <form>
              <div className="form-group">
                <label className="h6">
                  <span style={{ color: "red" }}>*</span>Nuevo nombre de
                  usuario.
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="newUsername"
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
            <form>
              <div className="form-group">
                <label className="h6">
                  <span style={{ color: "red" }}>*</span>Nuevo nombre completo.
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="newFullName"
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
            <form>
              <div className="form-group">
                <label className="h6">
                  <span style={{ color: "red" }}>*</span>Nuevo email
                </label>
                <input className="form-control" type="email" name="newEmail" />
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
            <form>
              <div className="form-group mt-2">
                <label className="h6">
                  <span style={{ color: "red" }}>*</span>Contraseña Actual.
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="actualPassword"
                />
              </div>
              <div className="form-group">
                <label className="h6">
                  <span style={{ color: "red" }}>*</span>Nueva Contraseña.
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="newPassword"
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

export default connect(mapStateToProps, { logout })(Profile);
