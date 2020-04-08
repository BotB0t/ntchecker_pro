import React, { Component, Fragment } from "react";
import TotalTable from "./TotalTable";
import Table from "./Table";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getIndividualNotifications } from "../../actions/data";

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
    console.log(this.state);
    console.log(this.props);
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
          <Table />
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
