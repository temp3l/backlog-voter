import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Spinner from "../Spinner";
import Moment from "react-moment";
import _ from "lodash";

/*
  https://loopback.io/doc/en/lb3/Define-model-relations.html
  Report belongsTo User  userId
  User hasMany Report    ownerId
  Backlog hasMany Report none
*/
function ReportsList() {
  const [reports, setReports] = useState();
  const [backlog, setBacklog] = useState();

  const backlogId = 3;
  useEffect(() => {
    const fetchData = async () => {
      let response = await api.get("/backlogs/"+backlogId+"?filter[include][reports][user]");
      setBacklog(response.data);
    };

    fetchData();
  }, []);

  if (!backlog) return <Spinner />;

  //shadow-lg p-3 mb-5 bg-white rounded
  return (
    <div>
      <h4>Reports</h4>
      <table className="table tokenTable table-condensed table-hover">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>BacklogID</th>
            <th>created</th>
            <th>userName</th>
            <th>email</th>
            <th>score</th>
            <th>data</th>
          </tr>
        </thead>
        <tbody>
          {backlog.reports.map((report, i) => {
            return (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.backlogId}</td>
                <td><Moment format="DD.MM.YYYY hh:mm">{report.date}</Moment></td>
                <td>{report.user.userName}</td>
                <td>{report.user.email}</td>
                <td>0</td>
                <td>{report.data.map(item=>{
                  return item.value.toFixed(0)
                }).join(', ')}</td>
               
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsList;
