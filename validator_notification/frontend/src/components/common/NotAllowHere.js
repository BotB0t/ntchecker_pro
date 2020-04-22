import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export class About extends Component {
	render() {
		return (
			<div className="container">
				<h2>No tienes permisos para estar aquí...</h2>
				<p>Por favor contacta con el administrador si necesitar permisos para entrar aquí.</p>

				<p>Puedes encontrar más información <Link to="/about">aquí</Link>.</p>
			</div>
		);
	}
}

export default About;
