import {
  Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Reporter from "./components/Reports/Reporter";
import Navbar2 from "./components/Navbar2";
import Login from "./components/Login/Login";
import Backlogs from "./components/Reports/Backlogs";
import Users from "./components/Users";
import Account from "./components/Account";
import ReportsList from "./components/Reports/ReportsList";
import { isAuthenticated, readToken, isAdmin } from "./services/auth2";
import api from "./services/api";
import history from './services/history';




function Root() {
  const [session, setSession] = useState(null); //its basically read-only
  const [tokens, setTokens] = useState([]); //pass to Account
  const [token, setToken] = useState(readToken())
  const [roles, setRoles] = useState([]); //pass to Account
  const [teams, setTeams] = useState(null); //pass to Account
  
  const removeToken = _token => {
    if(_token.id === session.token.id) {
      if( window.confirm('darn stupid, enjoy!') === false) return false
    }
    api.delete("/users/1/AccessTokens/" + _token.id);
    setTokens(tokens.filter(x => x.id !== _token.id));
  };

  useEffect(() => {
    console.log('Root-Effects');
    const fetchData = async () => {
      try {
        const { data } = await api("/users/info?id=" + token.userId);
        const { payload } = data;
        const { username, email, id, } = payload;
        setTokens(payload.accessTokens);
        setRoles(payload.roles);
        setTeams(payload.teams);
        setSession({ username, email, id, token: readToken(), isAdmin: isAdmin(payload.roles) });
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
          <Navbar2 isAdmin={isAdmin(roles)} session={session}/>
       
          <div className="Content container-fluid">
            <Switch>
              <Route path="/login/" render={props => (
                <Login {...props} setToken={setToken} />
              )} />

              {session &&<Route path="/account"
                render={props => isAuthenticated() ? (
                  <Account {...props} tokens={tokens} removeToken={removeToken} session={session} roles={roles} teams={teams} isAdmin={isAdmin(roles)}/>
                ) : ( <Redirect  to={{ pathname: "/login", state: { from: props.location } }}  /> )}
              />}

             {session && <Route path="/backlogs" exact
                render={props => isAuthenticated() ? (
                  <Backlogs {...props} isAdmin={isAdmin(roles)} session={session}/>
                ) : ( <Redirect  to={{ pathname: "/login", state: { from: props.location } }}  /> )}
              />}


            {session && <Route path="/backlogs/:id"
                render={props => isAuthenticated() ? (
                  <Reporter {...props} isAdmin={isAdmin(roles)}/>
                ) : ( <Redirect  to={{ pathname: "/login", state: { from: props.location } }}  /> )}
              />}

            {session && <Route path="/reports" exact
                render={props => isAuthenticated() ? (
                  <ReportsList {...props} isAdmin={isAdmin(roles)}/>
                ) : ( <Redirect  to={{ pathname: "/login", state: { from: props.location } }}  /> )}
              /> }

            {session &&  <Route path="/users" exact
                render={props => isAuthenticated() ? (
                  <Users {...props} session={session} isAdmin={isAdmin(roles)}/>
                ) : ( <Redirect  to={{ pathname: "/login", state: { from: props.location } }}  /> )}
              />}

              <Route render={props => <NotFound {...props} />} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
// const ProtectedRoute = ({ component: Component, ...attrs }) => {
//   return (
//     <Route
//       {...attrs}
//       render={props =>
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: "/login", state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// };

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar2 />

//         <div className="container-fluid Content">
//           <Route path="/login/" component={Login} />
//           <ProtectedRoute exact path="/" component={Account} />

//           <ProtectedRoute exact path="/backlogs" component={Backlogs} />
//           <ProtectedRoute path="/backlogs/:id" component={Reporter} exact />
//           <ProtectedRoute
//             path="/backlogs/:id/report/:reportId"
//             component={Reporter}
//           />

//           <ProtectedRoute path="/users/" component={Users} />
//           <ProtectedRoute path="/reports/" component={ReportsList} />
//           <ProtectedRoute path="/reporter/" component={Reporter} />
//           <Route render={() => <NotFound />} />
//         </div>
//       </div>
//     </Router>
//   );
// }

function NotFound() {
  return <p>404</p>;
}



/*
## State Management

- https://stackoverflow.com/questions/49938568/how-to-share-application-state-between-react-router-v4-routes/49939152

```js
You could manage data without redux if either of the scenarios matched your arrangement of components:

Parent to child relationship: Using Props
Child to parent relationship: Using callbacks
Siblings with a common parent.
But neither of the relationships satisfies your arrangement of the components since the two components are new root components.

When the components can't communicate between any sort of parent-child relationship, the documentation recommends setting up a global event system.
```
*/
export default Root;
