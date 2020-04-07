import React, { Fragment } from "react";
import DevicesForm from "./DevicesForm";
import Devices from "./Devices";

export default function LayoutDevices() {
  return (
    <Fragment>
      <div className="container">
        <DevicesForm />
      </div>
      <br></br>
      <div className="container">
        <Devices />
      </div>
    </Fragment>
  );
}
