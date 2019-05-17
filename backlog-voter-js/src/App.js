import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Reporter from "./components/Reporter";
import Navbar2 from "./components/Navbar2";
import "./App.css";

function Index() {
  return <h2>Home</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <Navbar2 />
        <div className="container-fluid">
          <Route path="/" component={Index} exact />
          <Route path="/backlogs/:id" component={Reporter} />

          <Route path="/users/" component={Users} />
          <Route path="/reporter/" component={Reporter} />
        </div>
      </div>
    </Router>
  );
}

export default App;
