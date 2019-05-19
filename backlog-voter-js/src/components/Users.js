import React, { useState, useEffect } from "react";
import api from "../services/api";
import Moment from "react-moment";
import Spinner from './Spinner';

const Admin = props => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await api("/users?filter[include][groups][permissions]");
      setUsers(userResponse.data);
    };
    fetchData();
  }, []);

  const edit = () => {

  };
  function getSum(total, num) {
    return total + num;
  }
  const {isAdmin, session} = props;

  if(!users) return <Spinner/>
  const host = window.location.hostname;
  return (
    <div className="container backlogs">
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
            let perms = user.groups.map( group => { 
              const permissions = group.permissions;
              if( permissions!==undefined && permissions !== null ) return group.permissions.length 
              return 0
            })
            
            
            

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
                <td>{user.groups.length}</td>
                <td><b>{perms.reduce(getSum,0)}</b> <small>{perms.join(',')}</small></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul className="list-group">
        <li className="list-group-item"><a href={`http://${host}:5000/api/users?filter[include][groups][permissions]&access_token=${session.token.id}`}>http://localhost:5000/api/users?filter[include][groups][permissions]</a></li>
        <li className="list-group-item"><a href={`http://${host}:5000/explorer`}>{`http://${host}:5000/explorer`}</a></li>
        <li className="list-group-item"><i>/api/users&filter[include][groups]?access_token=sjCJZ4Gqr6C6ZWLjyWcOc60RoES1zqoGx2x3uTZICABCLSPYAJeTuGxqJrryghdp</i></li>
      </ul>

      <pre>{JSON.stringify(users, undefined, 4)}</pre>
    </div>
  );
};

export default Admin;
