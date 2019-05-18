import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Reporter from "./components/Reporter";
import Navbar2 from "./components/Navbar2";
import Login from "./components/Login";
import Backlogs from "./components/Backlogs";
//import Home from "./components/Home";
import { isAuthenticated } from "./services/auth2";
import api from "./services/api";
import "./App.css";


function Home(){
  return (
    <div className='container-fluid'>
       <div className='row'>
         <div className='col-md-6'>col-md-6</div>
         <div className='col-md-6'>col-md-6</div>
       </div>
    </div>
  )
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
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/backlogs" component={Backlogs} />
          
          <ProtectedRoute path="/backlogs/:id" component={Reporter} exact/>
          <ProtectedRoute path="/backlogs/:id/report/:reportId" component={Reporter} />


          <Route path="/login/" component={Login} />
          <ProtectedRoute path="/reports/" component={Reports} />
          <ProtectedRoute path="/reporter/" component={Reporter} />
        </div>
      </div>
    </Router>
  );
}

export default App;
