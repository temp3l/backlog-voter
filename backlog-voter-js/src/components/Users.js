import React, { useState, useEffect } from "react";
import api from "../services/api";
import Moment from "react-moment";
import Spinner from './Spinner';

const Admin = props => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await api("/users?filter[include]=teams");
      setUsers(userResponse.data);
    };
    fetchData();
  }, []);



  const edit = () => {

  };

  const {isAdmin} = props;

  console.log('users');
  if(!users) return <Spinner/>
  return (
    <div className="container backlogs">
      <table className="table tokenTable table-condensed table-hover">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>del</th>
            <th>email</th>
            <th>created</th>
            <th>teams</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr key={user.id}>
                <td>{user.id} </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={e => edit(user, i)}>
                    <i className="fas fa-trash" />
                  </button>
                  &nbsp;
                  <button className="btn btn-warning btn-sm" onClick={e => edit(user, i)}>
                    <i className="fas fa-edit" />
                  </button>
                  &nbsp;
                  <button className="btn btn-success btn-sm" onClick={e => edit(user, i)}>
                    <i className="fas fa-users-cog"></i>
                  </button>
                  
                </td>
                <td>{user.email}</td>
                <td><Moment format="DD.MM.YYYY HH:MM">{user.created}</Moment></td>
                <td>{user.teams.length}</td>
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
