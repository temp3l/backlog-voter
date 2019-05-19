import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Spinner from "../Spinner";
import Moment from "react-moment";
/*
  https://loopback.io/doc/en/lb3/Define-model-relations.html
  Report belongsTo User  userId
  User hasMany Report    ownerId
  Backlog hasMany Report none
*/
function ReportsList() {
  const [reports, setReports] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let response = await api.get("/users/me/reports");
      setReports(response.data);
    };

    fetchData();
  }, []);
  if (!reports) return <Spinner />;
  console.log('report list')

  return (
    <div>
      <table className="table tokenTable table-condensed table-hover">
        <thead className="thead-dark">
          <tr>
            <th>del</th>
            <th>created</th>
            <th>token</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, i) => {
            return (
              <tr key={report.id}>
                <td>
                  <pre>{JSON.stringify(report, undefined, 4)}</pre>
                </td>
                <td>
                  <Moment format="DD.MM.YYYY HH:MM">{report.created}</Moment>
                </td>
                <td>{report.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsList;
