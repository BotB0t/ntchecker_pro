import React, { Fragment } from "react";
import TotalTable from "./TotalTable";
import Table from "./Table";

export default function LayoutDashboard() {
  return (
    <Fragment>
      <div className="container">
        <TotalTable />
      </div>
      <hr></hr>
      <div className="container">
        <Table />
      </div>
    </Fragment>
  );
}
