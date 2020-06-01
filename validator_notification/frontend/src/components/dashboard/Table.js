import React, { useState, Fragment } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

function getStats(username, notificationsAll) {
  var ok = 0, ko = 0, nan = 0, id = -1;
  var info = '';
  var notifications = [];
  notificationsAll.map(function (notification) {
    if (notification.user.username == username) {
      if (notification.status == "NEW") nan = nan + 1;
      else {
        if (notification.option_selected == "YES") ok = ok + 1;
        else if (notification.option_selected == "NO") ko = ko + 1;
      }

      if (notification.info)
        info = info + notification.info;

      id = notification.user.id;
      notifications.push(notification);
    }
  });
  return { id, ok, ko, nan, info, notifications };
};

function getData(notificationsAll, users) {
  var notificationsData = [];

  users.map((user) => {
    const { id, ok, ko, nan, info, notifications } = getStats(user.username, notificationsAll)
    notificationsData.push({
      id: id,
      user: user,
      ok: ok,
      ko: ko,
      nan: nan,
      info: info,
      notifications: notifications
    })
  });
  return notificationsData;
}

const defaultSorted = [{
  dataField: 'user.username',
  order: 'asc'
}];

const columns = [
  {
    dataField: 'user.username',
    text: 'Ususario',
    sort: true
  },
  {
    dataField: 'ok',
    text: 'OK',
    sort: true,
    align: 'center',
    headerStyle: { backgroundColor: '#c9ebbe' }
  },
  {
    dataField: 'ko',
    text: 'KO',
    sort: true,
    align: 'center',
    headerStyle: { backgroundColor: '#ffb8c8' }
  },
  {
    dataField: 'nan',
    text: '-',
    sort: true,
    align: 'center',
    headerStyle: { backgroundColor: '#DEE2E6' }
  },
  {
    dataField: 'info',
    text: 'Información',
    sort: true
  },
]


const { ExportCSVButton } = CSVExport;

export default function Table(props) {
  const [notifications] = useState(props.notifications);
  const [users] = useState(props.users);
  const notificationsData = getData(notifications, users)

  return (
    <Fragment>
      <h3>Glosario</h3>
      <ToolkitProvider
        keyField='id'
        data={notificationsData}
        columns={columns}
        exportCSV
      >
        {
          props => (
            <div className="container">
              {}
              <ExportCSVButton {...props.csvProps}>Descargar CSV</ExportCSVButton>
              <BootstrapTable
                {...props.baseProps}
                defaultSorted={defaultSorted}
                hover
                condensed
                bordered={false}
              />
            </div>
          )
        }
      </ToolkitProvider>
    </Fragment>
  );
}
