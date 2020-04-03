import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addDevice } from "../../actions/devices";
import {
  osVersion,
  osName,
  mobileModel,
  isIOS,
  mobileVendor,
} from "react-device-detect";

const platformList = [
  { label: "Android", value: "Android" },
  { label: "iOS", value: "iOS" },
];
const ownerList = [
  { label: "Personal", value: "Personal" },
  { label: "Empresa", value: "Empresa" },
];

export class DevicesForm extends Component {
  state = {
    name: "",
    platform: "",
    owner: "",
    device: "",
    os_family: "",
    os_version: "",
    isAutocomplete: false,
  };

  platformHandler = (platform) => {
    this.setState({ platform: platform });
  };
  ownerHandler = (owner) => {
    this.setState({ owner: owner });
  };

  static propTypes = {
    addDevice: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    var {
      name,
      tlf,
      platform,
      owner,
      device,
      os_family,
      os_version,
    } = this.state;
    platform = platform.value;
    owner = owner.value;
    name = tlf + "-" + mobileModel + "-" + owner;
    const _device = {
      name,
      tlf,
      platform,
      owner,
      device,
      os_family,
      os_version,
    };
    console.log(_device);
    this.props.addDevice(_device);
    // this.setState({
    //   name: "",
    //   tlf: "",
    //   platform: "",
    //   owner: "",
    //   device: "",
    //   os_family: "",
    //   os_version: "",
    // });
  };

  handleSwitchChange = () => {
    this.setState({
      device: mobileVendor + " - " + mobileModel,
      os_family: osName,
      os_version: osVersion,
      platform: isIOS ? platformList[1] : platformList[0],
    });
  };

  render() {
    console.log(this.state);
    console.log(mobileModel);
    console.log(mobileVendor);

    return (
      <div>
        <br></br>
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
            <form onSubmit={this.onSubmit}>
              <div className="form-group text-center">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => this.handleSwitchChange()}
                  readOnly
                >
                  Autocompletar
                </button>
              </div>
              <div className="form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Nº TLF o EXT.
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="tlf"
                  onChange={this.onChange}
                  value={this.state.tlf}
                />
              </div>
              <div className="form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> PLATAFORMA
                </label>
                <Select
                  value={this.state.platform}
                  name="platform"
                  onChange={this.platformHandler}
                  options={platformList}
                />
              </div>
              <div className="form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> PROPIETARIO
                </label>
                <Select
                  value={this.state.owner}
                  name="owner"
                  onChange={this.ownerHandler}
                  options={ownerList}
                />
              </div>
              <hr></hr>
              <div className="form-group">
                <label>
                  MODELO <i>{this.state.platform.value}</i>
                </label>
                <input
                  value={this.state.device}
                  className="form-control"
                  type="text"
                  name="device"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>
                  VERSION <i>{this.state.platform.value}</i>
                </label>
                <input
                  value={this.state.os_version}
                  className="form-control"
                  type="text"
                  name="os_version"
                  onChange={this.onChange}
                />
              </div>
              <hr></hr>
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
