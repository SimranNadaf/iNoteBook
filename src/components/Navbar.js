import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  const navigator = useNavigate(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigator("/signin");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>

            {!localStorage.getItem("token") ? (
              <div className="flex-end mx-2">
                <Link
                  className="btn btn-primary mx-2"
                  to="/signin"
                  role="button"
                >
                  Sign In
                </Link>
                <Link className="btn btn-primary" to="/signup" role="button">
                  Sign Up
                </Link>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleLogout}>
                Log out
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
