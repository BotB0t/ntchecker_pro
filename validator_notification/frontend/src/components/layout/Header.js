import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const adminButton = (
      <button
        className="btn btn-link dropdown-item"
        data-toggle="modal"
        data-target="#adminModal"
      >
        Entrar como administrador
      </button>
    );

    const authLinks = (
      <ul className="navbar-nav float-left mt-2 mt-lg-0">
        <li className="nav-item dropdown pr-5">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            data-display="static"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <strong>{user ? `${user.username}` : ""}</strong>
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-left">
            <Link to="/profile-info/devices" className="dropdown-item mb-1">
              Dispositivos
            </Link>
            <div className="dropdown-divider"></div>
            {user ? (user.is_staff ? adminButton : "") : ""}
            <div className="dropdown-divider"></div>
            <button onClick={this.props.logout} className="dropdown-item">
              Logout
            </button>
          </div>
        </li>
        <li className="nav-item"></li>
      </ul>
    );

    const adminLinks = (
      <li className="nav-item dropdown pr-5">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Administracion
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link to="/data/dashboard" className="dropdown-item">
            Dashboard
          </Link>
          <div className="dropdown-divider"></div>
          <Link to="/data/notification/general" className="dropdown-item">
            Formulario Notificaciones
          </Link>
        </div>
      </li>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        {/* <li className="nav-item">
          <Link to="/register" className="nav-link">
            Registrarse
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Entrar
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
          <a className="navbar-brand" href="#">
            Validador de Notificaciones
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Listado Notificaciones
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav-link">
                  Contáctanos
                </Link>
              </li>
              {user ? (user.is_staff ? adminLinks : "") : ""}

              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </nav>

        <div
          className="modal fade"
          id="adminModal"
          role="dialog"
          aria-labelledby="adminModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog " role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="adminModalLabel">
                  Acceder como administrador
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-dismiss="modal"
                    >
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
