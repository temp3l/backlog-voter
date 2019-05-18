import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import {
  setSession,
  getSession,
  removeSession,
  isAlive
} from "../services/auth2";

import Account from "./Account";
import Register from "./Register";

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

const getStoredUser = function(){
  let res = JSON.parse( localStorage.getItem('credentials') );
  return res || sampleUsers[0];
}

function Login(props) {
  const [user, setUser] = useState(getStoredUser());
  const [response, setResponse] = useState(null);
  const [session, setNewSession] = useState(getSession());

  const handleSubmit = async event => {
    event.preventDefault();
    axios
      .post("/api/users/login", user, { handlerEnabled: false })
      .then(response => {
        let session = Object.assign({}, response.data, { email: user.email });
        setSession(session);
        setNewSession(session)
        
        localStorage.setItem('credentials', JSON.stringify(user))
      })
      .catch(error => {
        setResponse(error.response.data);
        removeSession();
        setNewSession(null);
        localStorage.removeItem('credentials')
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
 

  return (
    <div>
      <div className="container-fluid">

      {!session && 
        <div className="container">
          <div className="row">
            <div className="col-md-6 LoginBox">
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
                  <br/>
                  <pre>{response && JSON.stringify(response, undefined, 4)}</pre>        
                </div>    
                </div>
              </form>
            </div>
            <div className="col-md-6 RegisterBox">
            <Register /></div>
          </div>
          <br/><br/>
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
      }
      {session && 
        <div className="container-fluid">
        <Account/>
         
          
        </div>
      }
        <br />
        <br />
        <br />

   
      </div>
    </div>
  );
}

export default Login;
