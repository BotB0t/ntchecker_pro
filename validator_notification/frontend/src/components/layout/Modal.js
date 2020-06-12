import React, { Component } from "react";

export class Modal extends Component {
  handleDeleteNotification = () => {
    this.props.deleteNotification(this.props.id, this.props.title);
  };

  handleCloseModal = () => {
    this.props.deactivateModal();
  };

  render() {
    return (
      <div
        className="modal fade"
        id="deleteModal"
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header bg-delete">
              <h4 className="modal-title" id="deleteModalLabel">
                <span className="display-4">&#9888;</span>
                <span className="pl-4 font-weight-bold">
                  ¿Desea borrar esta notificación?
                </span>
                <p className="font-italic h5">
                  Borrar la notificación general supone la pérdida de toda la
                  información asocidada a esta
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
                  TITULO:&nbsp;
                </span>
                {this.props.title}
              </h5>
              <h5>
                <span className="modal-lable font-weight-bold pr-2">
                  FECHA:&nbsp;
                </span>
                {new Intl.DateTimeFormat("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(this.props.date))}
              </h5>
              <br />
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
                onClick={this.handleDeleteNotification}
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

export default Modal;
