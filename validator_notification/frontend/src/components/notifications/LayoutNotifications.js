import React, { Fragment } from "react";
import Notifications from "./Notifications";
import CSVNotifications from "../data/CSVNotifications";

export default function LayoutNotifications() {
  return (
    <Fragment>
      {/* <CSVNotifications /> */}
      <Notifications />
    </Fragment>
  );
}
