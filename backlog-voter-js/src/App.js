import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Reporter from "./components/Reporter";
import Navbar2 from "./components/Navbar2";
import Login from "./components/Login";
import { isAuthenticated } from "./services/auth";
import api from "./services/api";

import "./App.css";

function Index() {
  return <h2>Home</h2>;
}

function Users() {
  const [users,setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let response = await api.get("/users");
      setUsers(response.data)
    };

    fetchData();
  }, []);

  
  return <div>
    <pre>{JSON.stringify(users,undefined,4)}</pre>
  </div>;
}

const ProtectedRoute = ({ component: Component, ...attrs }) => (
  <Route
    {...attrs}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

function App() {
  return (
    <Router>
      <div>
        <Navbar2 />
        <div className="container-fluid Content">
          <ProtectedRoute exact path="/" component={Index} />
          <ProtectedRoute path="/backlogs/:id" component={Reporter} />
          <Route path="/login/" component={Login} />
          <ProtectedRoute path="/users/" component={Users} />
          <ProtectedRoute path="/reporter/" component={Reporter} />
        </div>
      </div>
    </Router>
  );
}

export default App;
