import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getGeneralNotificationsAll,
  deleteGeneralNotification,
} from "../../actions/generalNotifications";
import { Modal } from "../layout/Modal";

export class GeneralNotifications extends Component {
  state = { isModalActive: false, id: null, title: null, date: null };

  static propTypes = {
    generalNotifications: PropTypes.array.isRequired,
    getGeneralNotificationsAll: PropTypes.func.isRequired,
    deleteGeneralNotification: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGeneralNotificationsAll();
  }

  LoadData(notification) {
    this.setState((state) => ({ id: notification.id }));
    this.setState((state) => ({ title: notification.title }));
    this.setState((state) => ({ date: notification.created_at }));
    this.setState((state) => ({ isModalActive: !this.state.isModalActive }));
  }

  deactivateModal = () => {
    this.setState((state) => ({ isModalActive: !this.state.isModalActive }));
  };

  deleteNotification = (id, title) => {
    this.props.deleteGeneralNotification(id, title);
    this.deactivateModal();
  };

  render() {
    const { generalNotifications } = this.props;
    generalNotifications.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const deleteModal = (
      <Modal
        id={this.state.id}
        title={this.state.title}
        date={this.state.date}
        modalActive={this.state.isModalActive}
        deleteNotification={this.deleteNotification}
        deactivateModal={this.deactivateModal}
      />
    );

    return (
      <Fragment>
        <h1>Listado Notificaciones</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>TITULO</th>
                <th>FECHA</th>
              </tr>
            </thead>
            <tbody>
              {this.props.generalNotifications.map((generalNotification) => (
                <tr key={generalNotification.id}>
                  <td>{generalNotification.title}</td>
                  <td>
                    {new Intl.DateTimeFormat("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(generalNotification.created_at))}
                  </td>
                  <td>
                    <button
                      className="btn btn-delete btn-sm"
                      data-toggle="modal"
                      data-target="#deleteModal"
                      disabled={false}
                      onClick={() => this.LoadData(generalNotification)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {this.state.isModalActive ? deleteModal : ""}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  generalNotifications: state.generalNotifications.generalNotifications,
});

export default connect(mapStateToProps, {
  getGeneralNotificationsAll,
  deleteGeneralNotification,
})(GeneralNotifications);
