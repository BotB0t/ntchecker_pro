import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getNotifications,
  updateNotification,
} from "../../actions/notifications";

import CardNotification from "./CardNotification";

export class Notifications extends Component {
  static propTypes = {
    notifications_new: PropTypes.array.isRequired,
    notifications_read: PropTypes.array.isRequired,
    getNotifications: PropTypes.func.isRequired,
    updateNotification: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getNotifications();
  }

  refreshPage() {
    window.location.reload(false);
  }

  onSubmit = (notification_to_update, id) => {
    // console.log(notification_to_update);
    this.props.updateNotification(notification_to_update, id);
  };

  render() {
    const noNotificationsMessage = (
      <div className="container">
        <br></br> No hay notificaciones aun, ¿puede ser que no tengas ningún{" "}
        <Link to="/profile-info/devices">dispositivo en el perfil</Link>?{" "}
      </div>
    );

    const noNewNotifications = (
      <div className="container">
        No hay nuevas notificaciones. ¡Estás al día!
      </div>
    );
    const noReadNotifications = (
      <div className="container">No has contestado ninguna notificación.</div>
    );

    return (
      <Fragment>
        <div className="container">
          <h1>Listado Notificaciones</h1>
          <div>
            <button
              className="btn btn-outline-secondary btn-block"
              onClick={() => this.refreshPage()}
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
                  Pendientes ({this.props.notifications_new.length})
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#readed">
                  Contestadas ({this.props.notifications_read.length})
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane container active" id="unreaded">
              {this.props.notifications_new.length == 0 &&
              this.props.notifications_read.length == 0 ? (
                noNotificationsMessage
              ) : (
                <br></br>
              )}
              {this.props.notifications_new.length == 0 ? (
                noNewNotifications
              ) : (
                <div></div>
              )}
              {this.props.notifications_new.map((notification) => (
                <div className="container" key={notification.id}>
                  <CardNotification
                    notification={notification}
                    onSubmit={this.onSubmit.bind(this)}
                  />
                  <br></br>
                </div>
              ))}
            </div>
            <div className="tab-pane container fade" id="readed">
              {this.props.notifications_new.length == 0 &&
              this.props.notifications_read.length == 0 ? (
                noNotificationsMessage
              ) : (
                <br></br>
              )}
              {this.props.notifications_read.length == 0 ? (
                noReadNotifications
              ) : (
                <div></div>
              )}
              {this.props.notifications_read.map((notification) => (
                <div className="container" key={notification.id}>
                  <CardNotification
                    notification={notification}
                    onSubmit={this.onSubmit.bind(this)}
                  />
                  <br></br>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications_read: state.notifications.notifications_read,
  notifications_new: state.notifications.notifications_new,
});

export default connect(mapStateToProps, {
  getNotifications,
  updateNotification,
})(Notifications);
