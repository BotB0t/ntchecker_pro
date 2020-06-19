import React, { Component } from "react";

export class DeviceModal extends Component {
  handleDeleteDevice = () => {
    this.props.deleteDevice(this.props.id, this.props.name);
  };

  handleCloseModal = () => {
    this.props.deactivateDeviceModal();
  };

  render() {
    return (
      <div
        className="modal fade"
        id="deviceModal"
        role="dialog"
        aria-labelledby="deviceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header bg-delete">
              <h4 className="modal-title" id="deviceModalLabel">
                <span className="display-4">&#9888;</span>
                <span className="pl-4 font-weight-bold">
                  ¿Desea borrar este dispositivo?
                </span>
                <p className="font-italic h5">
                  Borrar este dispositivo significa no recibir notificaciones en
                  él.
                </p>
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5>
                <span className="modal-lable font-weight-bold pr-2">
                  NÚMERO:&nbsp;
                </span>
                {this.props.name}
              </h5>
              <h5>
                <span className="modal-lable font-weight-bold pr-2">
                  PLATAFORMA:&nbsp;
                </span>
                {this.props.platform}
              </h5>
              <h5>
                <span className="modal-lable font-weight-bold pr-2">
                  PROPIETARIO:&nbsp;
                </span>
                {this.props.owner}
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-cancel"
                data-dismiss="modal"
                onClick={this.handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-delete"
                data-dismiss="modal"
                onClick={this.handleDeleteDevice}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceModal;
