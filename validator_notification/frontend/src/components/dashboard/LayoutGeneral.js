import React, { Component, Fragment } from "react";
import Loader from 'react-loader-spinner'
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
        {
          generalNotifications.length > 0 && notifications.length > 0 ?
            (
              <div className="container">
                <br></br>
                <div className="container">
                  <h3>Total</h3>
                  <TotalTable notifications={notifications} />
                </div>
                <hr></hr>
                <div className="container">
                  <div className="container">
                    <h3>Notificaciones Lanzadas</h3>
                    <ul className="nav nav-tabs nav-justified">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#general"
                        >
                          General
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#errors">
                          KO
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#solved">
                          Solucionadas
                         </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <br></br>
                    <div className="tab-pane container active" id="general">
                      <div className="row" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      >
                        {generalNotifications.map((general) => {
                          const individualNotifications = notifications.filter(
                            notification => notification.general.id == general.id);

                          return (
                            <CardGeneralNotification
                              key={general.id}
                              generalNotification={general}
                              individualNotifications={individualNotifications}
                            />
                          )
                        })}
                      </div>
                    </div>
                    <div className="tab-pane container fade" id="errors">Proximamente...</div>
                    <div className="tab-pane container fade" id="solved">Proximamente...</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container">
                <br></br>
                <div className="container" style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <h3>Recibiendo datos...</h3>
                </div>
                <div className="container" style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <Loader
                    type="Oval"
                    color="#9FD574"
                    height={50}
                    width={50}
                    timeout={10000} //10 secs
                  />
                </div>
              </div>
            )
        }
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
