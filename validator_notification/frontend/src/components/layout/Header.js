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

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-2">
          <strong>{user ? `${user.username}` : ""}</strong>
        </span>
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-link btn-sm"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const adminLinks = (
      // <li className="nav-item dropdown">
      //   <hr></hr>
      //   <a
      //     className="nav-link dropdown-toggle"
      //     href="#"
      //     id="navbarDropdownMenuLink"
      //     data-toggle="dropdown"
      //     aria-haspopup="true"
      //     aria-expanded="false"
      //   >
      //     Estadísticas
      //   </a>
      //   <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
      //     <Link className="dropdown-item nav-item" to="/about">
      //       Dashboard
      //     </Link>
      //   </div>
      // </li>
      <li className="nav-item">
        <hr></hr>
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
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
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
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
            <li className="nav-item">
              <Link to="/profile-info/devices" className="nav-link">
                Listado Dispositivos
              </Link>
            </li>
            {user ? (user.is_staff ? adminLinks : "") : ""}
            <li>
              <hr></hr>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                Contáctanos
              </Link>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
