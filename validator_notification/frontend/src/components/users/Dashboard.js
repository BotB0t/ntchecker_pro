import React, { Fragment } from "react";
import SignUpForm from "./SignUpForm";
import Users from "./Users";

export default function Dashboard() {
  return (
    <Fragment>
      <SignUpForm />
      <Users />
    </Fragment>
  );
}
