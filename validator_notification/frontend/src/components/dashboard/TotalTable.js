import React, { Component, Fragment } from "react";

export class TotalTable extends Component {
  render() {
    return (
      <Fragment>
        <h3>Resumen de la notificación</h3>
        <div className="table-responsive">
          <table
            className="table table-striped table-sm"
            style={{
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th className="table-success">OK</th>
                <th className="table-danger">KO</th>
                <th className="table-light">-</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default TotalTable;
