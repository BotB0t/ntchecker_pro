import React, { useState } from "react";

export default function CardNotification(props) {
  var [notification, setNotification] = useState(props.notification);
  var disable_btn_no = false;
  var disable_btn_yes = false;

  const handleOptionSelected = option_selected => {
    setNotification({
      ...notification,
      option_selected: option_selected
    });
    notification.option_selected = option_selected;
    onSubmit();
  };

  const onSubmit = () => {
    const notification_to_update = {
      general: notification.general.id,
      user: notification.user.id,
      device: notification.device.id,
      option_selected: notification.option_selected,
      status: "READ"
    };
    props.onSubmit(notification_to_update, notification.id);
    disable_btn_yes = true;
    disable_btn_no = true;
  };

  const cardBorder = () => {
    const cardBorderDanger = "card border-danger mb3 rounded";
    const cardBorderSuccess = "card border-success mb3 rounded";
    const cardBorderDark = "card border-dark mb3 rounded";
    if (notification.option_selected === "") return cardBorderDark;
    else if (notification.option_selected === "NO") return cardBorderDanger;
    else if (notification.option_selected === "YES") return cardBorderSuccess;
  };

  if (notification.option_selected !== "" && notification.status === "READ") {
    if (notification.option_selected === "YES") {
      disable_btn_yes = true;
      disable_btn_no = false;
    } else if (notification.option_selected === "NO") {
      disable_btn_yes = false;
      disable_btn_no = true;
    } else {
      disable_btn_yes = true;
      disable_btn_no = true;
    }
  }

  return (
    <div className={cardBorder()}>
      <div className="card-header">
        <small className="text-muted">
          {new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
          }).format(new Date(notification.created_at))}
        </small>
      </div>
      <div className="card-body text-secondary">
        <h2 className="card-title">
          <b>{notification.general.title}</b>
        </h2>
        <form>
          <div className="form-group">
            Vas a validar con este dispositivo:{" "}
            <h4>
              <b>{notification.device.name == null ?
                (notification.device.tlf + " - " + notification.device.platform) : notification.device.name}
              </b>
            </h4>
            <label>
              ¿Ha recibido la notificación de esta{" "}
              <a className="links" href={notification.general.url} target="_balnk">
                Publicación
              </a>
              ?
            </label>
            <div className="form-group">
              <button
                onClick={() => handleOptionSelected("YES")}
                type="submit"
                className="btn btn-accept btn-lg btn-block"
                disabled={disable_btn_yes}
              >
                SI
              </button>
              <button
                onClick={() => handleOptionSelected("NO")}
                type="submit"
                className="btn btn-delete btn-lg btn-block"
                disabled={disable_btn_no}
              >
                NO
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
