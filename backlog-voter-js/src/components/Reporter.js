import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reporter.css";

function Reporter({ match }) {
  const [reportItems, setReportItems] = useState([]);
  const [backlog, setBacklog] = useState({});
  const [value, setValue] = useState({});
  const backlogId = match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const reportItems = await axios("/api/reportItems");
      const backlog = await axios("/api/backlogs/" + backlogId);
      setBacklog(backlog.data);
      setReportItems(reportItems.data);

      let foo = {};
      reportItems.data.forEach(item => {
        foo = Object.assign({}, foo, { [item.name]: 0 });
      });
      setValue(foo);
    };
    fetchData();
  }, [backlogId]);

  const onChange = (name, evt) => {
    setValue(Object.assign({}, value, { [name]: evt.target.value }));
  };

  const submitReport = () => {
    //?access_token=zucJloKbFKFqI1LETY8vG5T4zkpS0qPE8eTogxO4HnpYCGzmROWeNCQiX6oGBmP0
    let report = Object.assign({ backlogId: backlog.id }, {data: value });
    console.log(report);

    axios
      .post("/api/users/1/reports", report)
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
      <pre>{JSON.stringify(value)}</pre>
      <ul className="PollBox">
        {reportItems.map(item => (
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
                    value={value[item.name]}
                    onChange={e => onChange(item.name, e)}
                  />
                </div>
                <div className="col col-md-1">{value[item.name]}</div>
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
export default Reporter;
