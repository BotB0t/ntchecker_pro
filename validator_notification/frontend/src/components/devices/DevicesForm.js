import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addDevice } from "../../actions/devices";
import {
  isMobile,
  isAndroid,
  osVersion,
  osName,
  mobileModel,
  isBrowser,
  getUA,
  mobileVendor
} from "react-device-detect";

const platformList = [
  { label: "Android", value: "Android" },
  { label: "iOS", value: "iOS" }
];
const ownerList = [
  { label: "Personal", value: "Personal" },
  { label: "Empresa", value: "Empresa" }
];

function format_user_agent() {
  if (isMobile) {
    this.setState();
  }
}

export class DevicesForm extends Component {
  state = {
    name: "",
    platform: "",
    owner: "",
    device: "",
    os_family: "",
    os_version: ""
  };

  platformHandler = platform => {
    console.log(platform);
    this.setState({ platform });
  };
  ownerHandler = owner => {
    this.setState({ owner });
  };

  static propTypes = {
    addDevice: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    var { name, platform, owner, device, os_family, os_version } = this.state;
    platform = platform.value;
    owner = owner.value;
    const _device = { name, platform, owner, device, os_family, os_version };
    console.log(_device);
    this.props.addDevice(_device);
    this.setState({
      name: "",
      platform: "",
      owner: "",
      device: "",
      os_family: "",
      os_version: ""
    });
  };

  render() {
    const { name, platform, owner } = this.state;
    if (isMobile) {
      this.state.device = mobileVendor + " - " + mobileModel;
      this.state.os_family = osName;
      this.state.os_version = osVersion;
      this.state.name = mobileModel ? mobileModel : "";
    }

    return (
      <div>
        <button
          className="btn btn-outline-success btn-block"
          type="button"
          data-toggle="collapse"
          data-target="#collapseForm"
          aria-expanded="false"
          aria-controls="collapseForm"
        >
          Añadir Dispositivo
        </button>
        <div className="collapse" id="collapseForm">
          <div className="card card-body mt-4 mb-4">
            <h1>AÑADIR DISPOSITIVO</h1>
            <>form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Nº Teléfono o Extensión</label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  onChange={this.onChange}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label>PLATAFORMA</label>
                <Select
                  value={platform}
                  onChange={this.platformHandler}
                  options={platformList}
                />
              </div>
              <div className="form-group">
                <label>PROPIETARIO</label>
                <Select
                  value={owner}
                  onChange={this.ownerHandler}
                  options={ownerList}
                  s
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  AÑADIR DISPOSITIVO
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addDevice })(DevicesForm);
