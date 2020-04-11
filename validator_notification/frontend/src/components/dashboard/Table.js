import React, { useState, Fragment } from "react";

function getStats(username, notifications) {
  var ok = 0, ko = 0, nan = 0;
  notifications.map(function (notification) {
    if(notification.user.username == username){
      if (notification.status == "NEW") nan = nan + 1;
      else {
        if (notification.option_selected == "YES") ok = ok + 1;
        else if (notification.option_selected == "NO") ko = ko + 1;
      }
    }
  });
  return {ok, ko, nan};
};

export default function Table(props) {
  const [notifications] = useState(props.notifications);
  const [users] = useState(props.users);

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
            {users.map((user) => {
              const {ok, ko, nan} = getStats(user.username, notifications);
              return (
                <tr
                  // data-toggle="collapse"
                  // data-target="#devices-list"
                  // className="accordion-toggle"
                  key={user.username}
                >
                  {console.log(user.username + ": " + ok + " - " + ko + " - " + nan)}
                  <td>{user.username}</td>
                  <td>{ok}</td>
                  <td>{ko}</td>
                  <td>{nan}</td>
                </tr>
              );
            })}
            {/* <tr className="accordian-body collapse" id="devices-list">
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
          </tr>; */}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
