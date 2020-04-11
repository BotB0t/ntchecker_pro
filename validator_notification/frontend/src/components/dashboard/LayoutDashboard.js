import React, { Component, Fragment } from "react";
import TotalTable from "./TotalTable";
import Table from "./Table";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

function getUsers(notifications){
  var user;
  var users = [];
  notifications.map(function (notification) {
    user = notification.user;
    if(!containsUser(user.username, users)){
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

  render() {
    // console.log(this.state);
    // console.log(this.props);
    var users = [];
    return (
      <Fragment>
        <div>
          <Link to="/data/dashboard">Back</Link>
        </div>
        <br></br>
        <div className="container"></div>
        <div className="container">
          <TotalTable />
        </div>  
        <hr></hr>
        <div className="container">
          {this.props.individualNotifications.length > 0 ? (
            <Table notifications={this.props.individualNotifications} users = {getUsers(this.props.individualNotifications)}/>
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
