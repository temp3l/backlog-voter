import React from "react";
import Moment from "react-moment";
import { reset } from "../services/auth2";
import Spinner from "./Spinner";
import styled from "styled-components";

const BoxShadow = styled.div`
  box-shadow: 10px 5px 5px black;
`;
const host = window.location.hostname;
function Account(props) {
  const { session, tokens, roles, teams, removeToken } = props;
  const graphiQL =
    "http://" +
    window.location.hostname +
    ":4000/graphiql?query=%7B%0A%20%20allBacklogs%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20desc%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D";
  const swagger =
    "http://" + window.location.hostname + ":4000/explorer/swagger.json";
  const explorer = "http://" + window.location.hostname + ":4000/explorer";

  if (!session) return <Spinner />;

  return (
    <div className="container-fluid">
      <button onClick={reset} className="btn btn-danger">
        Logout &nbsp;&nbsp;&nbsp; {session.email}
      </button>
      <br />
      <br />
      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <h4>Session</h4>
          <pre>{JSON.stringify(session, undefined, 3)}</pre>
        </div>

        <div className="col-md-3">
          <h4>roles</h4>
          <pre>{JSON.stringify(roles, undefined, 3)}</pre>
        </div>
        <div className="col-md-3">
          <h4>Teams</h4>
          <pre>{JSON.stringify(teams, undefined, 3)}</pre>
        </div>

        <div className="col-md-2">
          <h4>Backend</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`http://${host}:4000/graphiql?query=%7B%0A%20%20allUsers%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20firstName%0A%20%20%20%20%20%20%20%20lastName%0A%20%20%20%20%20%20%20%20userName%0A%20%20%20%20%20%20%20%20email%0A%20%20%20%20%20%20%20%20expiry%0A%20%20%20%20%20%20%20%20authSource%0A%20%20%20%20%20%20%20%20password%0A%20%20%20%20%20%20%20%20locked%0A%20%20%20%20%20%20%20%20lastLogin%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D`}
              >
                graphiQL
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <br />
              <br />
              <br />
              <br />
              <h4>Access Tokens</h4>

              <table className="table tokenTable table-condensed table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>del</th>
                    <th>created</th>
                    <th>token</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token, i) => {
                    return (
                      <tr key={token.id}>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={e => removeToken(token, i)}
                          >
                            <i className="fas fa-trash" />
                          </button>
                        </td>
                        <td>
                          <Moment format="DD.MM.YYYY hh:mm">
                            {token.created}
                          </Moment>
                        </td>
                        <td>{token.id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;
