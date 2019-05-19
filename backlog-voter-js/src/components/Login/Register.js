import React, { useState } from "react";
import api from "../../services/api";
import "./Login.scss";

function Login(props) {
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [response, setResponse] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    api
      .post("/users", user, { handlerEnabled: false })
      .then(response => setResponse(response.data))
      .catch(error => setResponse(error.response.data));
  };

  const onChange = (name, evt) => {
    setUser(Object.assign({}, user, { [name]: evt.target.value.trim() }));
  };

  return (
    <div className="container-fluid">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-group col-md-8">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-user" />
              </span>
            </div>
            <input
              onChange={e => onChange("email", e)}
              type="text"
              name="remail"
              id="remail"
              className="form-control"
              value={user.email}
              placeholder="username"
            />
          </div>

          <div className="input-group col-md-8">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-user" />
              </span>
            </div>
            <input
              onChange={e => onChange("username", e)}
              type="text"
              name="username"
              id="username"
              className="form-control"
              value={user.username}
              placeholder="username"
            />
          </div>
          <div className="input-group col-md-8">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-key" />
              </span>
            </div>
            <input
              onChange={e => onChange("password", e)}
              type="password"
              name="rpassword"
              id="rpassword"
              className="form-control"
              value={user.password}
              placeholder="password"
            />
            &nbsp;
            <button type="submit" className="btn btn-info">
              Register
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <br />
            <pre className="error">
              {response && JSON.stringify(response, undefined, 4)}
            </pre>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
