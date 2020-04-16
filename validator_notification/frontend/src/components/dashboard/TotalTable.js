import React, { useState, Fragment } from "react";

function getSummary(notifications) {
  var ok = 0, ko = 0, nan = 0;
  notifications.map(function (notification) {
    if (notification.status == "NEW") nan = nan + 1;
    else {
      if (notification.option_selected == "YES") ok = ok + 1;
      else if (notification.option_selected == "NO") ko = ko + 1;
    }
  });
  return { ok, ko, nan };
};

export function TotalTable(props) {
  const [notifications] = useState(props.notifications);
  const { ok, ko, nan } = getSummary(notifications);

  return (
    <Fragment>
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
              <td>{ok}</td>
              <td>{ko}</td>
              <td>{nan}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default TotalTable;
