import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { readToken, clearToken, saveToken } from "../services/auth2";
import Register from "./Register";
//import history from '../services/history';

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
  const [error, setError] = useState(null);
  const [token] = useState(null);
  //const [token, setToken] = useState( readToken() );
  const { setToken } = props;

  const handleSubmit = async event => {
    event.preventDefault();
    axios
      .post("/api/users/login", user, { handlerEnabled: false })
      .then(data => {
        saveToken(data);
        setToken(data);
        
        props.history.push("/account");
       // history.push('/account');

      })
      .catch(err => {
        clearToken();
        if (err.response && err.response.data)
          return setError(err.response.data);
        setError(err);
      });
  };

  const onChange = (name, evt) => {
    setUser(Object.assign({}, user, { [name]: evt.target.value.trim() }));
  };

  return (
    <div>
      <div className="container-fluid">
        {!token && (
          <div className="container">
            <div className="row">
              <div className="col-md-5 LoginBox">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="input-group col-md-6">
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
                    <div className="input-group col-md-6">
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
                      &nbsp;
                      <button type="submit" className="btn btn-success">
                        Login
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <br />
                      {error && (
                        <pre className="error">
                          {JSON.stringify(error, undefined, 4)}
                        </pre>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-1" />
              <div className="col-md-5 RegisterBox">
                <Register />
              </div>
            </div>
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
        )}
      </div>
    </div>
  );
}

export default Login;
