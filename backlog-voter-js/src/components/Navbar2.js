import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";

const HeaderNav = props => {
  const [backlogs, setBacklogs] = useState([]);
   useEffect(() => {
    const fetchData = async () => {
      const backlogs = await axios("/api/backlogs");
      setBacklogs(backlogs.data);
    };

    fetchData();
  }, []);

  return (
    <Navbar bg="dark" expand="sm" variant="dark">
      <Link className="navbar-brand" to="/">
        home
      </Link>
      <Link className="navbar-brand" to="/login">
        Login
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/users">
            users
          </Nav.Link>
          <NavDropdown title="Forms" id="markdown-nav-dropdown">
            {backlogs.map((backlog, i) => {
              return (
                <NavDropdown.Item
                  key={backlog.name}
                  as={NavLink}
                  to={`/backlogs/${backlog.id}`}
                >
                  {backlog.name}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderNav;
