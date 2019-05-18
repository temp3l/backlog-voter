import React, { useState, useEffect } from "react";
import _ from "lodash";
import Moment from "react-moment";
import {  readToken, clearToken } from "../services/auth2";
import api from "../services/api";

const graphiQL =
  "http://" +
  window.location.hostname +
  ":5000/graphiql?query=%7B%0A%20%20allBacklogs%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20desc%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D";
const swagger =
  "http://" + window.location.hostname + ":5000/explorer/swagger.json";


function Logout(event){
  event.preventDefault();
  clearToken();
  window.location.replace(window.location.href);
}

function Home(props) {
  
  const [token, setToken] = useState( readToken() );
  const [store, setStore] = useState(null);
  // const [teams, setTeams] = useState([]);
  const [accessTokens, setAccessTokens] = useState([]);
  const [roles, setRoles] = useState([]);

  const removeToken = (_token, idx) => {
    if (_token.id === token.id) return alert("darn stupid!");
    api.delete("/users/1/AccessTokens/" + token.id);
    let tok = accessTokens.slice();
    tok.splice(idx, 1);
    setAccessTokens(tok);
  };


  if (!store) return <p>loadig</p>;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <button onClick={Logout} className="btn btn-danger">
            Logout &nbsp;&nbsp;&nbsp; {store.email}
          </button>
        </div>
      </div>
      <br />
      <br />
      <ul className="list-group">
        <li className="list-group-item">
          <pre className="scrollPre">{JSON.stringify(_.omit(store, ["tokens"]), undefined, 7)}</pre>
        </li>
      </ul>
      <br />
      <br />

      {accessTokens && (
        <div className="container-fluid">
          <h3>My Tokens: {accessTokens.length}</h3>
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
              {accessTokens.map((token, i) => {
                return (
                  <tr key={token.id}>
                    <td>{i}</td>
                    <td>
                      <button
                        className="btn btn-warning"
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
      )}

      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <ul className="list-group">
          <li className="list-group-item">
            <a href={graphiQL} target="_blank" rel="noopener noreferrer">
              graphiql
            </a>
          </li>
          <li className="list-group-item">
            {" "}
            <a href={swagger} target="_blank" rel="noopener noreferrer">
              swagger.json
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Home;
