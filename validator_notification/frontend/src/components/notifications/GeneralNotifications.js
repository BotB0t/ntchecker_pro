import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGeneralNotificationsAll, deleteGeneralNotification } from "../../actions/generalNotifications";

export class GeneralNotifications extends Component {
	static propTypes = {
		generalNotifications: PropTypes.array.isRequired,
		getGeneralNotificationsAll: PropTypes.func.isRequired,
		deleteGeneralNotification: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.getGeneralNotificationsAll();
	}

	render() {
		const { generalNotifications } = this.props;
		generalNotifications.sort(
			(a, b) => new Date(b.created_at) - new Date(a.created_at)
		);

		return (
			<Fragment>
				<h1>Listado Notificaciones</h1>
				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>TITULO</th>
								<th>FECHA</th>
							</tr>
						</thead>
						<tbody>
							{this.props.generalNotifications.map((generalNotification) => (
								<tr key={generalNotification.id}>
									<td>{generalNotification.title}</td>
									<td>{new Intl.DateTimeFormat("es-ES", {
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "numeric",
										minute: "numeric",
									}).format(new Date(generalNotification.created_at))}</td>
									<td>
										<button
											onClick={this.props.deleteGeneralNotification.bind(
												this,
												generalNotification.id,
												generalNotification.title
											)}
											className="btn btn-danger btn-sm"
											disabled="true"
										>
											Delete
                    </button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => (
	// console.log(state),
	{
		generalNotifications: state.generalNotifications.generalNotifications,
	}
);

export default connect(mapStateToProps, { getGeneralNotificationsAll, deleteGeneralNotification })(GeneralNotifications);
