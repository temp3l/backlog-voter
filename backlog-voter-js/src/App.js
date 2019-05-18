import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Reporter from "./components/Reporter";
import Navbar2 from "./components/Navbar2";
import Login from "./components/Login";
import Backlogs from "./components/Backlogs";
import Users from "./components/Users";
import Account from "./components/Account";
import { isAuthenticated, readToken } from "./services/auth2";
import api from "./services/api";

function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">col-md-6</div>
        <div className="col-md-6">col-md-6</div>
      </div>
    </div>
  );
}

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await api.get("/users/me/reports");
      setReports(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {reports.map(report => {
          return (
            <li key={report.id}>
              id: {report.id} backlogId: {report.backlogId} userId:{" "}
              {report.ownerId}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
const ProtectedRoute = ({ component: Component, ...attrs }) => {
  return (
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
};

function App() {
  const [state, setState] = useState({ errors: null, data: null });
  const [token, setToken] = useState(readToken());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { response } = await api("/users/info?id=" + token.userId);
        setState({ errors:null, data: response.data });
      } 
      catch (err) {
        if (err.response && err.response.data) {
          setState({ errors: err.response.data, data: null });
        } else {
          setState({ errors: err, data: null });
        }
      }
    };
    fetchData();
  }, [token]);

  return (
    <Router>
      <div>
        <Navbar2 token={token}/>
        <div className="container-fluid Content">
          <Route path="/login/" component={Login} token={token}/>
          <ProtectedRoute exact path="/" component={Home} />

          <ProtectedRoute exact path="/backlogs" component={Backlogs} />
          <ProtectedRoute path="/backlogs/:id" component={Reporter} exact />
          <ProtectedRoute path="/backlogs/:id/report/:reportId" component={Reporter} />
          
          <ProtectedRoute path="/account/" component={Account} />
          <ProtectedRoute path="/users/" component={Users} />
          <ProtectedRoute path="/reports/" component={Reports} />
          <ProtectedRoute path="/reporter/" component={Reporter} />
        </div>
      </div>
    </Router>
  );
}

export default App;
