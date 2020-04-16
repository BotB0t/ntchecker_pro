import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TotalTable from "./TotalTable";
import CardGeneralNotification from "./CardGeneralNotification";
import { getGeneralNotificationsAll } from "../../actions/generalNotifications";
import { getNotificationsAll } from "../../actions/notifications";

export class LayoutGeneral extends Component {
  static propTypes = {
    generalNotifications: PropTypes.array.isRequired,
    notifications: PropTypes.array.isRequired,
    getGeneralNotificationsAll: PropTypes.func.isRequired,
    getNotificationsAll: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGeneralNotificationsAll();
    this.props.getNotificationsAll();
  }

  render() {
    const { generalNotifications, notifications } = this.props;
    generalNotifications.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return (
      <Fragment>
        <div className="container">
          <h3>Total</h3>
          {notifications.length > 0 ? (
            <div className="container">
              <TotalTable notifications={notifications} />
            </div>
          ) : (
              <div></div>
            )}
        </div>
        <hr></hr>
        <div className="container">
          <h3>Notificaciones Lanzadas</h3>
          <div className="row">
            {generalNotifications.length > 0 && notifications.length > 0 ?
              generalNotifications.map((general) => {
                const individualNotifications = notifications.filter(
                  notification => notification.general.id == general.id);

                return (
                  <CardGeneralNotification
                    key={general.id}
                    generalNotification={general}
                    individualNotifications={individualNotifications}
                  />
                )
              }) : <div>Cargando...</div>}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  generalNotifications: state.data.generalNotifications,
  notifications: state.notifications.notifications
});

export default connect(mapStateToProps, { getGeneralNotificationsAll, getNotificationsAll })(
  LayoutGeneral
);
