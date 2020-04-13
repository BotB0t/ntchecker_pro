import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addGeneralNotification } from "../../actions/generalNotifications";

export class GeneralNotificationForm extends Component {
	state = {
		title: "",
		url: "",
	};

	static propTypes = {
		addGeneralNotification: PropTypes.func.isRequired,
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = (e) => {
		e.preventDefault();
		const { title, url } = this.state;
		const _general = { title, url };
		this.props.addGeneralNotification(_general);
		this.setState({ title: "", url: "" })
	}

	render() {
		return (
			<div className="container">
				<div className="card card-body mt-4 mb-4">
					<h1>AÑADIR NOTIFICAION GENERAL</h1>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>
								<span style={{ color: "red" }}>*</span> TITULO
								</label>
							<input
								className="form-control"
								type="text"
								name="title"
								onChange={this.onChange}
								value={this.state.title}
							/>
							<small id="passwordHelpBlock" className="form-text text-muted">
								Hay que buscar los emoticonos <a href="https://emojiterra.com/es/" target="_bank">aquí</a>
							</small>
						</div>
						<div className="form-group">
							<label>
								URL
							</label>
							<input
								className="form-control"
								type="text"
								name="url"
								onChange={this.onChange}
								value={this.state.url}
							/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary">
								AÑADIR NOTIFICACION
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default connect(null, { addGeneralNotification })(GeneralNotificationForm);
