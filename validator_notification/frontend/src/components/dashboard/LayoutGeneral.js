import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getGeneralNotificationsAll } from "../../actions/data";

export class LayoutGeneral extends Component {
  static propTypes = {
    generalNotifications: PropTypes.array.isRequired,
    getGeneralNotificationsAll: PropTypes.func.isRequired,
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
        <h3>Notificaciones Lanzadas</h3>
        <div className="container">
          <div className="row">
            {this.props.generalNotifications.map((general) => (
              <div className="col-sm-4" key={general.id}>
                <Link to={`/data/dashboard/${general.id}`}>
                  <div className="card">
                    <div className="card-body">
                      <blockquote className="blockquote mb-0">
                        <h4 className="card-title">{general.title}</h4>
                        <small className="text-muted">
                          {new Intl.DateTimeFormat("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }).format(new Date(general.created_at))}
                        </small>
                      </blockquote>
                    </div>
                  </div>
                  <br></br>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  generalNotifications: state.data.generalNotifications,
});

export default connect(mapStateToProps, { getGeneralNotificationsAll })(
  LayoutGeneral
);
