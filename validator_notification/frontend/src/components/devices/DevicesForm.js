import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addDevice } from "../../actions/devices";

const platformList = [
  { label: "Android", value: "Android" },
  { label: "iOS", value: "iOS" }
];
const ownerList = [
  { label: "Personal", value: "Personal" },
  { label: "Empresa", value: "Empresa" }
];

export class DevicesForm extends Component {
  state = {
    name: "",
    platform: "",
    owner: ""
  };

  platformHandler = platform => {
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
    var { name, platform, owner } = this.state;
    platform = platform.value;
    owner = owner.value;
    const device = { name, platform, owner };
    this.props.addDevice(device);
    this.setState({
      name: "",
      platform: "",
      owner: ""
    });
  };

  render() {
    const { name, platform, owner } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h1>AÑADIR DISPOSITIVO</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>NOMBRE</label>
            <input
              className="form-control"
              type="text"
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
    );
  }
}

export default connect(null, { addDevice })(DevicesForm);
