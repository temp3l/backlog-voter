import React, { useState, useEffect } from "react";
import api from "../services/api";
import Moment from "react-moment";
import Spinner from "./Spinner";

const Admin = props => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await api(
        "/users?filter[include][groups][permissions]"
      );
      setUsers(userResponse.data);
    };
    fetchData();
  }, []);

  const edit = () => {};
  function getSum(total, num) {
    return total + num;
  }
  const { isAdmin, session } = props;

  if (!users) return <Spinner />;

  const host = window.location.hostname;
  return (
    <div className="container-fluid backlogs">
      <table className="table tokenTable table-condensed table-hover">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>del</th>
            <th>email</th>
            <th>created</th>
            <th>groups</th>
            <th>permissions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            //let permissions = user.groups.map(group => group.permissions)
            //console.log(permissions)
            let perms = user.groups.map(group => {
              const permissions = group.permissions;
              if (permissions !== undefined && permissions !== null)
                return group.permissions.length;
              return 0;
            });
            return (
              <tr key={user.id}>
                <td>{user.id} </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={e => edit(user, i)}
                  >
                    <i className="fas fa-trash" />
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={e => edit(user, i)}
                  >
                    <i className="fas fa-edit" />
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-success btn-sm"
                    onClick={e => edit(user, i)}
                  >
                    <i className="fas fa-users-cog" />
                  </button>
                </td>
                <td>{user.email}</td>
                <td>
                  <Moment format="DD.MM.YYYY HH:MM">{user.created}</Moment>
                </td>
                <td>{user.groups.length}</td>
                <td>
                  <b>{perms.reduce(getSum, 0)}</b>{" "}
                  <small>{perms.join(",")}</small>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul className="list-group">
        <li className="list-group-item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`http://${host}:4000/api/users?filter[include][groups][permissions]&access_token=${
              session.token.id
            }`}
          >
            {`http://${host}:4000/api/users?filter[include][groups][permissions]&access_token=${
              session.token.id
            }`}
          </a>
        </li>

        <li className="list-group-item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`http://${host}:4000/api/users?filter[include]=activities&filter[include][groups][permissions]`}
          >{`http://${host}:4000/api/users?filter[include]=activities&filter[include][groups][permissions]`}</a>
        </li>

        <li className="list-group-item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`http://${host}:4000/explorer`}
          >{`http://${host}:4000/explorer`}</a>
        </li>
        <li className="list-group-item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`http://${host}:4000/graphiql?query=%7B%0A%20%20allUsers%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20firstName%0A%20%20%20%20%20%20%20%20lastName%0A%20%20%20%20%20%20%20%20userName%0A%20%20%20%20%20%20%20%20email%0A%20%20%20%20%20%20%20%20expiry%0A%20%20%20%20%20%20%20%20authSource%0A%20%20%20%20%20%20%20%20password%0A%20%20%20%20%20%20%20%20locked%0A%20%20%20%20%20%20%20%20lastLogin%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D`}
          >
            graphQL all Users
          </a>
        </li>
      </ul>
    </div>
  );
};
//<pre>{JSON.stringify(users, undefined, 4)}</pre>
export default Admin;
