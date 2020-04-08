import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { getDevices, deleteDevice } from "../../actions/devices";

export default class Table extends Component {
  static propTypes = {};

  render() {
    return (
      <Fragment>
        <h3>Glosario</h3>
        <div className="table-responsive">
          <table
            className="table table-sm"
            style={{
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th>Usuario</th>
                <th className="table-success">OK</th>
                <th className="table-danger">KO</th>
                <th className="table-light">-</th>
              </tr>
            </thead>

            <tbody>
              <tr
                data-toggle="collapse"
                data-target="#devices-list"
                className="accordion-toggle"
              >
                <td>aabrilfl</td>
                <td>0</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr className="accordian-body collapse" id="devices-list">
                <td colSpan="20" className="hiddenRow">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Device</th>
                        <th>Ver.</th>
                        <th>Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Xiaomi Redmi Note 8</td>
                        <td>9.0</td>
                        <td>Empresa</td>
                      </tr>
                      <tr>
                        <td>Xiaomi Redmi Note 8</td>
                        <td>9.0</td>
                        <td>Empresa</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}
