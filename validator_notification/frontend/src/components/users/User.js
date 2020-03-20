import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../../actions/user";

export class User extends Component {
  static propTypes = {
    user: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <Fragment>
        <h1>User: </h1> <p>a</p>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, { getUser })(User);
