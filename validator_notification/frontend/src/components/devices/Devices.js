import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDevices, deleteDevice } from "../../actions/devices";
import { DeviceModal } from "../layout/DeviceModal";

export class Devices extends Component {
  state = { isDeviceModalActive: false, id: null, name: null, platform: null, owner: null };

  static propTypes = {
    devices: PropTypes.array.isRequired,
    getDevices: PropTypes.func.isRequired,
    deleteDevice: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getDevices();
  }

  LoadData(device) {
    this.setState((state) => ({ id: device.id }));
    this.setState((state) => ({ name: device.name }));
    this.setState((state) => ({ platform: device.platform }));
    this.setState((state) => ({ owner: device.owner }));
    this.setState((state) => ({ isDeviceModalActive: !this.state.isDeviceModalActive }));
  }

  deactivateModal = () => {
    this.setState((state) => ({ isDeviceModalActive: !this.state.isDeviceModalActive }));
  };

  deleteDeviceAction = (id, name) => {
    this.props.deleteDevice(id, name);
    this.deactivateModal();
  };

  render() {
    const confirmModal = (
      <DeviceModal
        id={this.state.id}
        name={this.state.name}
        platform={this.state.platform}
        owner={this.state.owner}
        deviceModalActive={this.state.deviceModalActive}
        deleteDevice={this.deleteDeviceAction}
        deactivateDeviceModal={this.deactivateModal}
      />
    );

    return (
      <Fragment>
        <h1>Listado Dispositivos</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nº TLF</th>
                <th>PLAT.</th>
                <th>PROP.</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {this.props.devices.map((device) => (
                <tr key={device.id}>
                  <td>{device.tlf}</td>
                  <td>{device.platform}</td>
                  <td>{device.owner}</td>
                  <td>
                  <button
                      className="btn btn-delete btn-sm"
                      data-toggle="modal"
                      data-target="#deviceModal"
                      disabled={false}
                      onClick={() => this.LoadData(device)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {this.state.isDeviceModalActive ? confirmModal : ""}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  devices: state.devices.devices,
});

export default connect(mapStateToProps, { getDevices, deleteDevice })(Devices);
