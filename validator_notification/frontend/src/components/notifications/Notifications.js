import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
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

  render() {
    return (
      <Fragment>
        <h1>Notificaciones List</h1>
        <div className="container">
          {this.props.notifications.map(notification => (
            <CardNotification
              notification={notification}
              key={notification.id}
            />
          ))}
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
