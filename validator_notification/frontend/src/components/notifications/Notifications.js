import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getNotifications } from "../../actions/notifications";

import CardNotification from "./CardNotification";

export class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    getNotifications: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getNotifications();
  }

  refreshPage() {
    window.location.reload(false);
  }

  render() {
    console.log(this.props);

    const noNotificationsMessage = (
      <div className="container">
        <br></br> No hay notificaciones aun, ¿porque no{" "}
        <Link to="/profile-info/devices">añades un dispositivo</Link>?{" "}
      </div>
    );
    return (
      <Fragment>
        <div className="container">
          <h1>Lista de Notificaciones</h1>
          <div>
            <button
              className="btn btn-outline-secondary btn-block"
              onClick={this.refreshPage}
            >
              Actualizar
            </button>
          </div>
          <br></br>
          <div className="container">
            <ul className="nav nav-tabs nav-justified">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#unreaded"
                >
                  Notificaciones
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#readed">
                  Contestadas
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane container active" id="unreaded">
              {this.props.notifications.length == 0 ? (
                noNotificationsMessage
              ) : (
                <br></br>
              )}
              {this.props.notifications.map(function(notification) {
                if (notification.status === "NEW") {
                  return (
                    <CardNotification
                      notification={notification}
                      key={notification.id}
                    />
                  );
                }
              })}
            </div>
            <div className="tab-pane container fade" id="readed">
              {this.props.notifications.map(function(notification) {
                if (notification.status === "READ") {
                  return (
                    <CardNotification
                      notification={notification}
                      key={notification.id}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications.notifications
});

export default connect(mapStateToProps, {
  getNotifications
})(Notifications);
