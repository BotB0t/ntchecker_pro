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
                        className="btn btn-link links"
                      >
                        aabrilfl@mercadona.es
                      </a>
                    </li>
                    <li>
                      Tlf.{" "}
                      <a className="links" href="tel:683482573" target="_blank">
                        683 48 25 73
                      </a>
                    </li>
                    <li>
                      Ext.{" "}
                      <a className="links" href="tel:28511" target="_blank">
                        28511
                      </a>
                    </li>
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
