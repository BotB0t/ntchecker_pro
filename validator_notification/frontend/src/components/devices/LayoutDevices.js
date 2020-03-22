import React, { Fragment } from "react";
import DevicesForm from "./DevicesForm";
import Devices from "./Devices";

export default function LayoutDevices() {
  return (
    <Fragment>
      <DevicesForm />
      <Devices />
    </Fragment>
  );
}
