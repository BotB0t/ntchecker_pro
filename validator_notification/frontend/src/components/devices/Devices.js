import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDevices, deleteDevice } from "../../actions/devices";

export class Devices extends Component {
  static propTypes = {
    devices: PropTypes.array.isRequired,
    getDevices: PropTypes.func.isRequired,
    deleteDevice: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getDevices();
  }

  render() {
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
                      onClick={this.props.deleteDevice.bind(
                        this,
                        device.id,
                        device.name
                      )}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  devices: state.devices.devices,
});

export default connect(mapStateToProps, { getDevices, deleteDevice })(Devices);
