import React from "react";

export default function CardNotification(props) {
  var { notification } = props;
  return (
    <div className="card border-secondary mb-3">
      <div className="card-header">
        <small className="text-muted">
          {new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }).format(new Date(notification.created_at))}
        </small>
      </div>
      <div className="card-body text-secondary">
        <h5 className="card-title">{notification.general.title}</h5>
        <form>
          <div className="form-group">
            Vas a validar con este dispositivo:{" "}
            <b>{notification.device.name}</b>
            <label>
              ¿Ha recibido la notificación de esta{" "}
              <a href={notification.general.url} target="_balnk">
                Publicación
              </a>
              ?
            </label>
            <div className="input-group">
              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
              >
                SI
              </button>
              <button type="submit" className="btn btn-danger btn-lg btn-block">
                NO
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
