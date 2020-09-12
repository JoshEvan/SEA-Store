import { Link } from "react-router-dom";
import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  render() {
    return (
      <header
        style={{
          marginBottom: `1.45rem`,
        }}
      >
        <nav className="navbar navbar-expand-md sticky-top">
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {this.props.siteTitle}
            </Link>
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggle"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">=</span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarToggle"
            style={{ paddingLeft: "5%", paddingTop: "1%" }}
          >
            <form className="form-inline">
              <div className="input-group">
                <input
                  type="text"
                  name="search"
                  className="form-control"
                  placeholder="search"
                  aria-label="search"
                  aria-describedby="search"
                />
                <div className="input-group-append">
                  <button className="btn btn-grad-violet" type="submit">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-search"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active mr-4 nav-choice">
                <a className="nav-link header-menu" href="/">
                  Profile<span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active">
                <a href="/" className="mr-2">
                  <button
                    type="submit"
                    className="btn header-menu logout nav-choice px-4 py-2"
                  >
                    Log in
                  </button>
                </a>
              </li>
              <li className="nav-item active">
                <a href="/" className="mr-2">
                  <button
                    type="submit"
                    className="btn header-menu logout nav-choice px-4 py-2"
                  >
                    Register
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
