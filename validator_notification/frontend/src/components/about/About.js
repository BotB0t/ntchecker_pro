import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export class About extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-0">
              <div className="card-body text-center">
                <h5 className="card-title mb-0">Antonio Jesús Abril Flores</h5>
                <div className="card-text text-black-50">
                  <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li>Div. Programas Espejo</li>
                    <li>RRHH Dpto. Informática</li>
                    <li>
                      <a
                        href="mailto:aabrilfl@mercadona.es"
                        target="_blank"
                        className="btn btn-link"
                      >
                        aabrilfl@mercadona.es
                      </a>
                    </li>
                    <li>Tlf. 683 48 25 73</li>
                    <li>Ext. 28511</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <Link to="/" className="btn btn-outline-dark btn-block">
              Ir al Menú Principal
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
