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

  useEffect(() => {
    const fetchData = async () => {
      let response = await api.get("/users/me/reports");
      setReports(response.data);
    };

    fetchData();
  }, []);
  if (!reports) return <Spinner />;
  console.log('report list')

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
            <th>token</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, i) => {
            return (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.backlogId}</td>
                <td><Moment format="DD.MM.YYYY hh:mm">{report.date}</Moment></td>
                <td>
                  <pre>{JSON.stringify( _.omit(report,'data'))}</pre>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsList;
