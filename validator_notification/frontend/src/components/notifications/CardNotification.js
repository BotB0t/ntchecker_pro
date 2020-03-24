import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateNotification } from "../../actions/notifications";

export class CardNotification extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);

    this.state = {
      notification: this.props.notification,
      disable_btn_yes: false,
      disable_btn_no: false
    };

    // console.log(this.state.notification);

    this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    updateNotification: PropTypes.func.isRequired
  };

  // onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { notification } = this.state;
    var general = notification.general.id;
    var user = notification.user.id;
    var device = notification.device.id;
    var option_selected = notification.option_selected;
    var status = "READ";
    const notification_to_update = {
      general,
      user,
      device,
      option_selected,
      status
    };
    // console.log(notification_to_update);
    this.props.updateNotification(notification_to_update, notification.id);
    this.setState({
      disable_btn_no: "",
      disable_btn_yes: ""
    });
  };

  handleOptionSelected = option_selected => {
    this.state.notification.option_selected = option_selected;
  };

  render() {
    const { notification } = this.state;

    // console.log(this.state.notification);
    if (
      this.state.notification.option_selected !== "" &&
      this.state.notification.status === "READ"
    ) {
      // console.log("HOLA");
      if (this.state.notification.option_selected === "YES") {
        this.state.disable_btn_yes = true;
        this.state.disable_btn_no = false;
      } else if (this.state.notification.option_selected === "NO") {
        this.state.disable_btn_yes = false;
        this.state.disable_btn_no = true;
      } else {
        this.state.disable_btn_yes = false;
        this.state.disable_btn_no = false;
      }
    }

    // console.log(notification);
    return (
      <div className="card border-secondary mb-3">
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
          <h5 className="card-title">{notification.general.title}</h5>
          <form onSubmit={this.onSubmit}>
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
              <div className="form-group">
                <button
                  onClick={() => this.handleOptionSelected("YES")}
                  type="submit"
                  className="btn btn-success btn-lg btn-block"
                  disabled={
                    this.state.notification.option_selected === "YES"
                      ? true
                      : false
                  }
                >
                  SI
                </button>
                <button
                  onClick={() => this.handleOptionSelected("NO")}
                  type="submit"
                  className="btn btn-danger btn-lg btn-block"
                  disabled={this.state.disable_btn_no}
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
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { updateNotification })(
  CardNotification
);

// export default CardNotification;
