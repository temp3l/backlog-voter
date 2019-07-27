import * as React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";

const CRUD_linkSchema = [
  {
    rel: "create",
    method: "POST",
    href: "...",
    schema: { $ref: "postSchema" }
  },
  { rel: "update", method: "PUT", href: "...", schema: { $ref: "putSchema" } },
  { rel: "delete", method: "DELETE", href: "...", schema: { $ref: "delShema" } }
];

const CQRS_linkSchema = [
  {
    rel: "create",
    method: "POST",
    href: "...",
    schema: { $ref: "commandSchema" }
  },
  {
    rel: "update",
    method: "POST",
    href: "...",
    schema: { $ref: "commandSchema" }
  },
  {
    rel: "delete",
    method: "POST",
    href: "...",
    schema: { $ref: "commandSchema" }
  }
];

const HeaderNav = () => {
  const schemas = [
    "simple",
    "protectonaut",
    "network",
    "person",
    "improved",
    "inventory",
    "device",
    "conditional",
    "bundle"
  ];
  const docs = [
    "changelog",
    "README",
    "schema",
    "client",
    "server",
    "asyncAkelius"
  ];

  return (
    <Navbar bg="dark" expand="sm" variant="dark">
      <Link className="navbar-brand" to="/">
        home
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/test">
            test
          </Nav.Link>

          <NavDropdown title="Products" id="markdown-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/products/1">
              prod-1
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/products/2">
              prod-2
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/products/3">
              prod-3
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="CRUD" id="markdown-nav-dropdown">
            {schemas.map(name => {
              return (
                <NavDropdown.Item
                  key={name}
                  as={NavLink}
                  to={`/jsonFormDiag/${name}`}
                >
                  {name}
                </NavDropdown.Item>
              );
            })}
            <NavDropdown.Item as={NavLink} to="/jsonForm/Akelius">
              asyncAkelius
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Forms" id="markdown-nav-dropdown">
            {schemas.map(name => {
              return (
                <NavDropdown.Item
                  key={name}
                  as={NavLink}
                  to={`/jsonForm/${name}`}
                >
                  {name}
                </NavDropdown.Item>
              );
            })}
            <NavDropdown.Item as={NavLink} to="/jsonForm/Akelius">
              asyncAkelius
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Schema" id="markdown-nav-dropdown">
            {schemas.map(name => {
              return (
                <NavDropdown.Item
                  key={name}
                  as={NavLink}
                  to={`/code/${name}.schema.json`}
                >
                  {name}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>

          <NavDropdown title="Docs" id="markdown-nav-dropdown">
            {docs.map(name => {
              return (
                <NavDropdown.Item
                  key={name}
                  as={NavLink}
                  to={`/mark/${name}.md`}
                >
                  {name}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </Nav>

        <Form inline={true}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderNav;
