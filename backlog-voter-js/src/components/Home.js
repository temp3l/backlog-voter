import React, { useState, useEffect } from "react";
import _ from "lodash";
import Moment from "react-moment";
import { isAlive } from "../services/auth2";
import api from "../services/api";

const graphiQL =
  "http://" +
  window.location.hostname +
  ":5000/graphiql?query=%7B%0A%20%20allBacklogs%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20desc%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D";
const swagger =
  "http://" + window.location.hostname + ":5000/explorer/swagger.json";

function Home() {
  const [session, setNewSession] = useState(null);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let sess = await isAlive();
      setNewSession(sess);
      setTokens(sess.tokens.reverse());
    };
    fetchData();
  }, []);

  const removeToken = (token, idx) => {
    if (token.id === session.id) return alert("darn stupid!");
    api.delete("/users/1/AccessTokens/" + token.id);
    let tok = tokens.slice();
    tok.splice(idx, 1);
    setTokens(tok);
  };
  return (
    <div className="container">
      <h2>Session Details</h2>

      <pre> {JSON.stringify(_.omit(session, ["tokens"]), undefined, 3)}</pre>
      <br/><br/>

      {session && session.tokens && (
        <div className="container-fluid">
          <p>tokens: {tokens.length}</p>
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
                        className="btn btn-danger"
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

      <br/><br/><br/><br/>
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
