import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import {
  setSession,
  getSession,
  removeSession,
  isAlive
} from "../services/auth2";

const graphiQL =
  "http://" +
  window.location.hostname +
  ":5000/graphiql?query=%7B%0A%20%20allBacklogs%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20desc%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D";

const sampleUsers = [
  {
    username: "John",
    email: "john@doe.com",
    password: "xxx",
    role: "$owner, teamMember, $authenticated, $everyone"
  },
  {
    username: "Jane",
    email: "jane@doe.com",
    password: "xxx",
    role: "teamMember, $authenticated, $everyone"
  },
  {
    username: "Bob",
    email: "bob@projects.com",
    password: "xxx",
    role: "admin, $authenticated, $everyone"
  }
];

function Login(props) {
  const [user, setUser] = useState(sampleUsers[0]);
  const [response, setResponse] = useState(null);
  const [session, setNewSession] = useState(getSession());

  const handleSubmit = async event => {
    event.preventDefault();
    axios
      .post("/api/users/login", user, { handlerEnabled: false })
      .then(response => {
        let session = Object.assign({}, response.data, { email: user.email });
        setSession(session);
        props.history.push("/");
      })
      .catch(error => {
        setResponse(error.response.data);
        removeSession();
        setNewSession(null);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      let sess = await isAlive();
      setNewSession(sess);
    };
    fetchData();
  }, []);
  const onChange = (name, evt) => {
    setUser(Object.assign({}, user, { [name]: evt.target.value.trim() }));
  };
  const destroy = event => {
    event.preventDefault();
    setResponse(null);
    removeSession();
    setNewSession(null);
  };

  return (
    <div>
      <div className="container-fluid">
        {session && <p>Stored session: {session.id}</p>}
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
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i>
              ...check:{" "}
              <a href={graphiQL} target="_blank" rel="noopener noreferrer">
                graphiql
              </a>
            </i>
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
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              {sampleUsers.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
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
