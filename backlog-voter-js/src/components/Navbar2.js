import React from "react";
import { Link } from "react-router-dom";


const HeaderNav = props => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
      <Link className="navbar-brand" to="/">Home</Link>
      <ul className="navbar-nav">

      <li className="nav-item">
          <Link className="nav-link" to="/reports">Reports</Link>
        </li>
      
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/backlogs">Backlogs</Link>
        </li>
      </ul>
    </nav>
  </div>
  );
};

export default HeaderNav;
