import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./Login.css";

function Login(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [response, setResponse] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    api
      .post("/users", user, { handlerEnabled: false })
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        const { response } = error;
        if(!response || !response.data) return setResponse(response)
        const { data } = response;
        setResponse(data);
      });
  };

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  const onChange = (name, evt) => {
    setUser(Object.assign({}, user, { [name]: evt.target.value.trim() }));
  };

  return (
    <div className="container-fluid">
      <h3>Register</h3>
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
              name="remail"
              id="remail"
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
            <pre>{response && JSON.stringify(response, undefined, 4)}</pre>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
