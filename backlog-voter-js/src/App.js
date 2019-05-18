import {
  Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Reporter from "./components/Reporter";
import Navbar2 from "./components/Navbar2";
import Login from "./components/Login";
import Backlogs from "./components/Backlogs";
import Users from "./components/Users";
import Account from "./components/Account";
import { isAuthenticated, readToken } from "./services/auth2";
import api from "./services/api";
import history from './services/history';


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

function Root() {
  const [session, setSession] = useState(null); //its basically read-only
  const [tokens, setTokens] = useState([]); //pass to Account
  const [token, setToken] = useState(readToken())
  const [roles, setRoles] = useState([]); //pass to Account
  const [teams, setTeams] = useState(null); //pass to Account
  
  const removeToken = _token => {
    if(_token.id === session.token.id) {
      // eslint(no-restricted-globals)
      if( window.confirm('darn stupid, u enjoy?') === false) return false
    }
    api.delete("/users/1/AccessTokens/" + _token.id);
    setTokens(tokens.filter(x => x.id !== _token.id));
  };
  

  const pushHistory = path => {
    ///props.history.push('/test')
  }

  useEffect(() => {
    console.log('Root-Effects');
    const fetchData = async () => {
      try {
        const { data } = await api("/users/info?id=" + token.userId);
        const { payload } = data;
        const { username, email, id } = payload;
        setSession({ username, email, id, token: readToken() });
        setTokens(payload.accessTokens);
        setRoles(payload.roles);
        setTeams(payload.teams);
      } catch (err) {
        throw err;
      }
    };
    if(token && token.userId){
        fetchData();
    }
  }, [token]);

  return (
    <div>
      <Router history={history}>
        <div className="router">
          <Navbar2 />
          <div className="Content container-fluid">

            <Switch>
              <Route path="/login/" render={props => (
                <Login {...props} setToken={setToken} pushHistory={pushHistory}/>
              )} />


              <Route path="/account"
                render={props => isAuthenticated() ? (
                  <Account {...props} tokens={tokens} removeToken={removeToken} session={session} roles={roles} teams={teams}/>
                ) : ( <Redirect  to={{ pathname: "/login", state: { from: props.location } }}  /> )}
              />


              <Route render={props => <NotFound {...props} />} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
function App() {
  return (
    <Router>
      <div>
        <Navbar2 />

        <div className="container-fluid Content">
          <Route path="/login/" component={Login} />
          <ProtectedRoute exact path="/" component={Account} />

          <ProtectedRoute exact path="/backlogs" component={Backlogs} />
          <ProtectedRoute path="/backlogs/:id" component={Reporter} exact />
          <ProtectedRoute
            path="/backlogs/:id/report/:reportId"
            component={Reporter}
          />

          <ProtectedRoute path="/account/" component={Account} />
          <ProtectedRoute path="/users/" component={Users} />
          <ProtectedRoute path="/reports/" component={Reports} />
          <ProtectedRoute path="/reporter/" component={Reporter} />
          <Route render={() => <NotFound />} />
        </div>
      </div>
    </Router>
  );
}

function NotFound() {
  return <p>404</p>;
}
export default Root;
