import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./Backlogs.css";

const Admin = props => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await api("/users?filter[include]=teams&filter[include]=roles");
      setUsers(userResponse.data);
    };
    fetchData();
  }, []);
  const editUser = () => {};

  const {isAdmin} = props;
  if(!isAdmin) return (<p>Need Admin Role!</p>)

  return (
    <div className="container backlogs">
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>del</th>
            <th>email</th>
            <th>userName</th>
            <th>token</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr key={user.id}>
                <td>{user.id} </td>
                <td>
                  <button className="btn btn-warning" onClick={editUser}>
                    <i className="fas fa-trash" />
                  </button>
                </td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                </td>
                <td>{user.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul>
        <li>simon may: READ $owner</li>
      </ul>
      <pre>{JSON.stringify(users, undefined, 4)}</pre>
    </div>
  );
};

export default Admin;
