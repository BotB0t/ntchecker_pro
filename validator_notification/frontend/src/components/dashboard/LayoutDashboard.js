import React, { Component, Fragment } from "react";
import TotalTable from "./TotalTable";
import Table from "./Table";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { getIndividualNotifications } from "../../actions/data";


function containsUser(username, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].username === username) {
      return true;
    }
  }

  return false;
}

function getUsers(notifications) {
  var user;
  var users = [];
  notifications.map(function (notification) {
    user = notification.user;
    if (!containsUser(user.username, users) && user.is_active) {
      users.push(user);
    }
  });
  return users;
}



class LayoutDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general_id: this.props.match.params.id,
      redirect: false
    };
  }

  static propTypes = {
    individualNotifications: PropTypes.array.isRequired,
    getIndividualNotifications: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getIndividualNotifications({
      general_id: this.state.general_id,
    });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/data/dashboard' />
    }
  }

  render() {
    return (
      <Fragment>
        <br></br>
        {this.renderRedirect()}
        <button className="btn btn-link" onClick={this.setRedirect}>Atrás</button>
        <br></br>
        <div className="container">
          {this.props.individualNotifications.length > 0 ? (
            <div className="container">
              <div className="container">
                <h2>{this.props.individualNotifications[0].general.title}</h2>
              </div>
              <hr></hr>
              <h3>Total</h3>
              <TotalTable notifications={this.props.individualNotifications} />
            </div>
          ) : (
              <div></div>
            )}
        </div>
        <hr></hr>
        <div className="container">
          {this.props.individualNotifications.length > 0 ? (
            <Table notifications={this.props.individualNotifications} users={getUsers(this.props.individualNotifications)} />
          ) : (
              <div></div>
            )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  individualNotifications: state.data.individualNotifications,
});

export default connect(mapStateToProps, { getIndividualNotifications })(
  LayoutDashboard
);
