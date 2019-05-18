import React from "react";
import Moment from "react-moment";
import {reset} from "../services/auth2";

function Account(props) {
  const { session, tokens, roles, teams, removeToken } = props;
  const graphiQL = "http://" + window.location.hostname + ":5000/graphiql?query=%7B%0A%20%20allBacklogs%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20desc%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D";
  const swagger ="http://" + window.location.hostname + ":5000/explorer/swagger.json";
  const explorer ="http://" + window.location.hostname + ":5000/explorer";
  //const remove = id => removeToken('1NV1MX932OADgDUzFCZPXGDup3EyDTGsd8opFYuKpR4qGhPISCPFKUYkZQU7w6q7');
 

  if(!session || !tokens || !roles || !teams) return (<div>Loading</div>)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          <h4>Session</h4>
          <button onClick={reset} className="btn btn-danger">
          Logout &nbsp;&nbsp;&nbsp; {session.email}
        </button>
          <pre>{JSON.stringify(session, undefined, 3)}</pre>
        </div>
        <div className="col-md-4">
          <h4>roles</h4>
          <pre>{JSON.stringify(roles, undefined, 3)}</pre>
        </div>
        <div className="col-md-3">
          <h4>Teams</h4>
          <pre>{JSON.stringify(teams, undefined, 3)}</pre>
        </div>
      </div>

      <div className="container">
        <h4>Backend</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <a href={graphiQL} target="_blank" rel="noopener noreferrer">
              /graphiql
            </a>
          </li>
          <li className="list-group-item">
          <a href={explorer} target="_blank" rel="noopener noreferrer">
              /explorer
            </a>
          </li>
          <li className="list-group-item">
            <a href={swagger} target="_blank" rel="noopener noreferrer">
              /swagger.json
            </a>
          </li>
        </ul>
      </div>
      <br/><br/>
      <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>del</th>
                <th>TTL</th>
                <th>created</th>
                <th>token</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, i) => {
                return (
                  <tr key={token.id}>
                  <td>{i}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={e => removeToken(token, i)}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                  <td>{token.ttl}</td>
                  <td>
                    <Moment format="DD.MM.YYYY HH:MM">{token.created}</Moment>
                  </td>
                  <td>{token.id}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
      </div>
    </div>
  );
}
export default Account