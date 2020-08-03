import React, { useState, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";

function getStats(username, notificationsAll) {
  var ok = 0,
    ko = 0,
    nan = 0,
    id = -1;
  var info = "";
  var notifications = [];

  notificationsAll.map(function (notification) {
    if (notification.user.username == username) {
      if (notification.status == "NEW") 
        nan += 1;
      else {
        if (notification.option_selected == "YES") 
          ok += 1;
        else if (notification.option_selected == "NO") 
          ko += 1;
      }

      if (notification.info) 
        info = info + notification.info;

      id = notification.user.id;
      notifications.push(notification);
    }
  });
  return { id, ok, ko, nan, info, notifications };
}

function getData(notificationsAll, users) {
  var notificationsData = [];

  users.map((user) => {
    const { id, ok, ko, nan, info, notifications } = getStats(
      user.username,
      notificationsAll
    );
    notificationsData.push({
      id: id,
      user: user,
      ok: ok,
      ko: ko,
      nan: nan,
      info: info,
      notifications: notifications,
    });
  });
  return notificationsData;
}

function getDeviceData(notificationsData) {
  var devicesData = [];
  var device_id = -1;
  var status = "";

  notificationsData.map(function (data) {
    status = "";
    if (data.status == "NEW") 
      status = "NaN";
    else {
      if (data.option_selected == "YES") 
        status = "OK";
      else if (data.option_selected == "NO") 
        status = "KO";
    }
    device_id = data.id;

    devicesData.push({
      device_id: device_id,
      devices: data.device,
      status,
    });
  });
  return devicesData;
}

const defaultSorted = [
  {
    dataField: "user.username",
    order: "asc",
  },
];

const columns = [
  {
    dataField: "user.username",
    text: "Ususario",
    sort: true,
  },
  {
    dataField: "ok",
    text: "OK",
    sort: true,
    align: "center",
    headerStyle: { backgroundColor: "#c9ebbe", textAlign: "center" },
  },
  {
    dataField: "ko",
    text: "KO",
    sort: true,
    align: "center",
    headerStyle: { backgroundColor: "#ffb8c8", textAlign: "center" },
  },
  {
    dataField: "nan",
    text: "-",
    sort: true,
    align: "center",
    headerStyle: { backgroundColor: "#DEE2E6", textAlign: "center" },
  },
  {
    dataField: "info",
    text: "Información",
    sort: true,
  },
];

const detailColumns = [
  {
    dataField: "devices.device",
    text: "Modelo",
    sort: true,
  },
  {
    dataField: "devices.tlf",
    text: "Número",
    sort: true,
  },
  {
    dataField: "devices.owner",
    text: "Tipo",
    sort: true,
  },
  {
    dataField: "status",
    text: "Estado",
    sort: true,
  },
];

const { ExportCSVButton } = CSVExport;

export default function Table(props) {
  const [notifications] = useState(props.notifications);
  const [users] = useState(props.users);
  const notificationsData = getData(notifications, users);
  const deviceData = getDeviceData(notificationsData[0].notifications);

  const detailRow = {
    renderer: (row) => (
      <div className="container">
        <BootstrapTable
          keyField="device_id"
          data={deviceData}
          columns={detailColumns}
          defaultSorted={defaultSorted}
          hover
          condensed
          bordered={false}
        />
      </div>
    ),
  };

  return (
    <Fragment>
      <h3>Glosario</h3>
      <ToolkitProvider
        keyField="id"
        data={notificationsData}
        columns={columns}
        exportCSV
      >
        {(props) => (
          <div className="container">
            {}
            <ExportCSVButton {...props.csvProps}>Descargar CSV</ExportCSVButton>
            <BootstrapTable
              {...props.baseProps}
              defaultSorted={defaultSorted}
              hover
              condensed
              bordered={false}
              expandRow={detailRow}
            />
          </div>
        )}
      </ToolkitProvider>
    </Fragment>
  );
}
