import React, { useState, useEffect } from "react";
import axios from "axios";

// import api from "../services/api";

import { authenticateUser, destroySession } from "../services/auth";

function Login(props) {
  const [user, setUser] = useState({
    email: "bob@projects.com",
    password: "opensesame"
  });
  const [response, setResponse] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  const onChange = (name, evt) => {
    setUser(Object.assign({}, user, { [name]: evt.target.value }));
  };

  const destroy = event => {
    event.preventDefault();
    destroySession();
    setResponse(null);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    axios
      .post("/api/users/login", user)
      .then(response => {
        authenticateUser(JSON.stringify(response.data, undefined, 4));
        setResponse(response.data);
      })
      .catch(error => {
        setResponse(error.response.data);
        destroySession();
      });
  };

  let sampleUsers = [
    { username: "John", email: "john@doe.com", password: "xxx" },
    { username: "Jane", email: "jane@doe.com", password: "xxx" },
    { username: "Bob", email: "bob@projects.com", password: "xxx" }
  ];

  return (
    <div>
      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="input-group col-md-3">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-user" />
              </span>
            </div>
            <input
              onChange={e => onChange("email", e)}
              type="text"
              name="email"
              id="email"
              className="form-control"
              value={user.email}
              placeholder="username"
            />
          </div>
          <div className="input-group col-md-3">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-key" />
              </span>
            </div>
            <input
              onChange={e => onChange("password", e)}
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={user.password}
              placeholder="password"
            />
          </div>
          <br />
          <div className="col-md-3">
            <button type="submit" className="btn btn-success">
              Login
            </button>
            &nbsp;&nbsp;
            <button onClick={destroy} className="btn btn-danger">
              Destroy
            </button>
          </div>
        </form>

        <br />
        <pre>{response && JSON.stringify(response, undefined, 4)}</pre>

        <br />
        <br />
        <br />
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>email</th>
                <th>password</th>
              </tr>
            </thead>
            <tbody>
              {sampleUsers.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Login;
