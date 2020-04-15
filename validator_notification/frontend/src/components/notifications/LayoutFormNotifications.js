import React, { Fragment } from "react";
import GeneralNotificationForm from "./GeneralNotificationForm";
import GeneralNotifications from "./GeneralNotifications";

export default function LayoutFormNotifications() {
	return (
		<Fragment>
			<div className="container">
				<GeneralNotificationForm />
			</div>
			<br></br>
			<div className="container">
				<GeneralNotifications />
			</div>
		</Fragment>
	);
}
