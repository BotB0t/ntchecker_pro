import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import { getNotificationsCSV } from "../../actions/data";

export class CSVNotifications extends Component {
  static propTypes = {
    notifications_csv: PropTypes.string.isRequired,
    getNotificationsCSV: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getNotificationsCSV();
  }

  render() {
    var { notifications_csv } = this.props;
    console.log(notifications_csv);
    return (
      <div>
        <CSVLink
          data={notifications_csv}
          filename={
            "NotificationChecker-" +
            new Intl.DateTimeFormat("es-ES", {
              year: "numeric",
              month: "numeric",
              day: "numeric"
            }).format(new Date()) +
            ".csv"
          }
          className="btn btn-primary"
          target="_blank"
        >
          Download me
        </CSVLink>
        ;
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications_csv: state.data.notifications_csv
});

export default connect(mapStateToProps, { getNotificationsCSV })(
  CSVNotifications
);
