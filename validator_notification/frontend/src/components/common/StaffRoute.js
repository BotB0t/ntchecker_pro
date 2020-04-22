import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NotAllowHere from "./NotAllowHere";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (auth.isLoading) {
				return <h2>Loading...</h2>;
			} else if (!auth.isAuthenticated) {
				return <Redirect to="/login" />;
			} else {
				if (auth.user.is_staff) {
					return <Component {...props} />;
				} else {
					return <NotAllowHere />;
				}
			};
		}}
	/>
);

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
