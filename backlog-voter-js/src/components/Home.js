import React, { useState, useEffect } from "react";
import _ from "lodash";
import Moment from "react-moment";
import { isAlive } from "../services/auth2";

function Home() {
  const [session, setNewSession] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      let sess = await isAlive();
      setNewSession(sess);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>Home</h2>
      <pre> {JSON.stringify(_.omit(session, ["tokens"]), undefined, 3)}</pre>
      {session && session.tokens && (
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
            {session.tokens.map( (token,i) => {
              return (
                <tr>
                <td>{i}</td>
                  <td>
                    <button class="btn btn-danger">
                      <i class="fas fa-trash" />
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
      )}
    </div>
  );
}
export default Home;
