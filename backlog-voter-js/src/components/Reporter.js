import React, { useState, useEffect } from "react";
import "./Reporter.css";
import api from "../services/api";
import { getSession } from "../services/auth2";

function Reporter({ match }) {
  const [reportItems, setReportItems] = useState([]);
  const [backlog, setBacklog] = useState({});


  const backlogId = match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const reportItems = await api("/reportItems");
      const backlog = await api("/backlogs/" + backlogId);

      setBacklog(backlog.data);
      setReportItems(
        reportItems.data.map(item => Object.assign(item, { value: 0 }))
      );
    };
    fetchData();
  }, [backlogId]);

  const onChange = (idx, evt) => {
    let obj = reportItems.slice();
    obj[idx].value = evt;
    setReportItems(obj);
  };

  const submitReport = () => {
    let report = Object.assign(
      { backlogId: backlog.id },
      { data: reportItems }
    );
    console.log(report);

    api
      .post("/users/" + getSession().id + "/reports", report)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <h3>Create a report for: {backlog.name} </h3>
      <p className="description">{backlog.desc}</p>
      <ul className="PollBox">
        {reportItems.map((item, idx) => (
          <li key={item.id}>
            <div className="container-fluid">
              <div className="row">
                <div className="col col-md-2">{item.name}</div>

                <div className="col col-md-9">
                  <input
                    className="slider"
                    type="range"
                    min="0"
                    max="100"
                    value={item.value}
                    onChange={e => onChange(idx, e.target.value)}
                  />
                </div>
                <div className="col col-md-1">{item.value}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={submitReport} className="btn btn-success">
        Submit Report
      </button>
    </div>
  );
}
//onChange={e => onChange(item.name, e)}
export default Reporter;
