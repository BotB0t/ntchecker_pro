import React, { useState } from "react";
import { Link } from "react-router-dom";
import TotalTable from "./TotalTable"

export default function CardGeneralNotification(props) {
	const [general] = useState(props.generalNotification)
	const [individualNotifications] = useState(props.individualNotifications)

	return (
		<div className="col-sm-4" key={general.id}>
			<Link to={`/data/dashboard/${general.id}`}>
				<div className="card">
					<div className="card-body">
						<blockquote className="blockquote mb-0">
							<h4 className="card-title">{general.title}</h4>
							<small className="text-muted">
								{new Intl.DateTimeFormat("es-ES", {
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "numeric",
									minute: "numeric",
									second: "numeric",
								}).format(new Date(general.created_at))}
							</small>
						</blockquote>
						<blockquote className="blockquote mb-0">
							<small className="text-muted">
								<TotalTable notifications={individualNotifications} />
							</small>
						</blockquote>
					</div>
				</div>
				<br></br>
			</Link>
		</div>
	)
}
