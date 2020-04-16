import React, { useState } from "react";
import { Link } from "react-router-dom";
import TotalTable from "./TotalTable"

export default function CardGeneralNotification(props) {
	const [general] = useState(props.generalNotification)
	const [individualNotifications] = useState(props.individualNotifications)

	return (
		<div className="col-sm-4" key={general.id}>
			<Link to={`/data/dashboard/${general.id}`}>
				<div className="card rounded">
					<div className="card-header">
						<small className="text-muted">
							{new Intl.DateTimeFormat("es-ES", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
							}).format(new Date(general.created_at))}
						</small>
					</div>
					<div className="card-body text-secondary">
						<h4 className="card-title">
							<b>{general.title}</b>
						</h4>
					</div>
					<small className="text-muted">
						<TotalTable notifications={individualNotifications} />
					</small>
				</div>
				<br></br>
			</Link>
		</div>
	)
}
