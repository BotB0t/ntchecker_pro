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
											className="btn btn-danger btn-sm"
											data-toggle="modal"
											data-target="#exampleModal"
											disabled={false}
										>
											Delete
                    					</button>
										<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
											<div className="modal-dialog " role="document">
												<div className="modal-content">
													<div className="modal-header bg-danger">
														<h4 className="modal-title text-light" id="exampleModalLabel">
															<span className="display-4">&#9888;</span>
															<span className="pl-4 font-weight-bold">¿Desea borrar esta notificación?</span>
															<h5 className="font-italic">*Borrar la notificación general supone la pérdida de toda la información asocidada a esta*</h5></h4>
														<button type="button" className="close" data-dismiss="modal" aria-label="Close">
															<span aria-hidden="true">&times;</span>
														</button>
													</div>
													<div className="modal-body">
														<h5><span className="modal-lable font-weight-bold pr-2">TITULO:</span> {generalNotification.title}</h5>
														<h5><span className="modal-lable font-weight-bold pr-2">FECHA:</span> {new Intl.DateTimeFormat("es-ES", {
															year: "numeric",
															month: "long",
															day: "numeric",
															hour: "numeric",
															minute: "numeric",
														}).format(new Date(generalNotification.created_at))}</h5><br />

													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
														<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.deleteGeneralNotification.bind(
															this,
															generalNotification.id,
															generalNotification.title
														)}>Delete</button>
													</div>
												</div>
											</div>
										</div>
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
