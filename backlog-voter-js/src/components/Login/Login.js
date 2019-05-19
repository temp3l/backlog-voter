import React, { useState } from "react";
import axios from "axios";
import { clearToken, saveToken } from "../../services/auth2";
import _ from "lodash";
const sampleUsers = [
  {
    email: "john@doe.com",
    password: "xxx",
    role: "$owner, teamMember, $authenticated, $everyone"
  },
  {
    email: "jane@doe.com",
    password: "xxx",
    role: "teamMember, $authenticated, $everyone"
  },
  {
    email: "bob@doe.com",
    password: "xxx",
    role: "admin, $authenticated, $everyone"
  },
  {
    email: "mult@doe.com",
    password: "xxx",
    role: "admin, SNT-admin, ..."
  }
];

function Login(props) {
  const [user, setUser] = useState(sampleUsers[2]);
  const [error, setError] = useState(null);
  const { setToken } = props;

  const handleLogin = async event => {
    event.preventDefault();
    axios
      .post("/api/users/login", _.omit(user,['username', 'role']), { handlerEnabled: false })
      .then(data => {
        saveToken(data);
        setToken(data);
        if (data.id) return props.history.push("/account");
        setError(data.response.data);
      })
      .catch(err => {
        clearToken();
        if (err.response && err.response.data)  return setError(err.response.data);
        setError(err);
      });
  };

  const handleRegister = async event => {
    event.preventDefault();
    axios
      .post("/api/users", _.omit(user,['username', 'role']), { handlerEnabled: false })
      .then(response => setError(response.response.data.error))
      .catch(err => setError(err));
  };
  const onChange = (name, evt) => {
    setUser(Object.assign({}, user, { [name]: evt.target.value.trim() }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 shadow-lg p-3 mb-5 bg-white rounded">
          <h3>Login </h3>
          <form  onSubmit={handleLogin}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Email *" value={user.email} onChange={e => onChange("email", e)}/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" placeholder="Your Password *" value={user.password} onChange={e => onChange("password", e)}/>
            </div>
            <div className="form-group">
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-md-6'>
                      <button type="submit" className="btn btn-primary btn-block" value="Login" >login</button>
                  </div>
                  <div className='col-md-6'>
                    <button className="btn btn-success btn-block" value="Register" onClick={handleRegister}>register</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-8 shadow-lg p-3 mb-5 bg-white rounded">
          <div className="container">
            <table className="table table-condensed table-hover cursor">
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
                    <tr key={i} onClick={e => { setUser({ email: user.email, password: "xxx" }); }}>
                      <td> {user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.role}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
      <br/>
        {error && (<div className="col-md-12 shadow-lg p-3 mb-5 bg-white rounded"> 
          <pre className="error">{JSON.stringify(error, undefined, 4)}</pre>
        </div>)}
      </div>
    </div>
  );
}
/*
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
                        <td
                          onClick={e => {
                            setUser({ email: user.email, password: "xxx" });
                          }}
                        >
                          {user.email}
                        </td>
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
      </div>*/
export default Login;
