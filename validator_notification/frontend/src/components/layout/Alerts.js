import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    // console.log(this.props);
    if (error !== prevProps.error) {
      if (error.msg.email) alert.error("EMAIL: " + error.msg.username.join());
      if (error.msg.username)
        alert.error("USERNAME: " + error.msg.username.join());
      if (error.msg.password)
        alert.error("PASSWORD: " + error.msg.password.join());
      if (error.msg.name) alert.error("NOMBRE: " + error.msg.name.join());
      if (error.msg.platform)
        alert.error("PLATAFORMA: " + error.msg.platform.join());
      if (error.msg.owner)
        alert.error("PROPIETARIO: " + error.msg.owner.join());
      if (error.msg.deleteDevice) alert.error(error.msg.deleteDevice.join());
      if (error.msg.deleteDevice) alert.error(error.msg.deleteDevice.join());
      if (error.msg.addDevice) alert.success(error.msg.addDevice.join());
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
    }

    if (message !== prevProps.message) {
      if (message.deleteDevice) alert.success(message.deleteDevice);
      if (message.addDevice) alert.success(message.addDevice);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
      if (message.updateNotification) alert.success(message.updateNotification);
    }
  }

  render() {
    1;
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
