import React, { useState, useEffect } from "react";
import api from "../services/api";
import Moment from "react-moment";
import "./Backlogs.css";

const Admin = props => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await api("/users");
      setUsers(userResponse.data);
    };

    fetchData();
  }, []);
  const editUser = () => {};

  //{"where": { "backlogId":1 } }
  return (
    <div className="container backlogs">
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>userName</th>
            <th>created</th>
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
                <td>{user.username}</td>
                <td>
                  <Moment format="DD.MM.YYYY HH:MM">{user.created}</Moment>
                </td>
                <td>{user.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
