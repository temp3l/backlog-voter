import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./Reporter.scss";

function Reporter(props) {
  const [reportItems, setReportItems] = useState([]);
  const [backlog, setBacklog] = useState({});
  //const [val, setVal] = useState(10);
  const backlogId = props.match.params.id;
  const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

  useEffect(() => {
    const fetchData = async () => {
      const reportItems = await api("/reportItems");
      const backlog = await api("/backlogs/" + backlogId);
      setBacklog(backlog.data);
      setReportItems(
        reportItems.data.map(item => Object.assign(item, { value: 0 }))
      );

      setReportItems(
        reportItems.data.map(item =>
          Object.assign(item, { value: getRandomInt(30) })
        )
      );
      let interval = setInterval(() => {
        setReportItems(
          reportItems.data.map(item =>
            Object.assign(item, { value: item.value + 0.28 })
          )
        );
      }, 20);
      setTimeout(() => clearInterval(interval), 3500);
    };
    fetchData();
  }, [backlogId]);

  const onChange = (idx, evt) => {
    let obj = reportItems.slice();
    obj[idx].value = evt;
    setReportItems(obj);
  };

  const submitReport = async () => {
    let report = Object.assign(
      { backlogId: backlog.id, userId: props.session.id },
      { data: reportItems }
    );
    console.log(report);
    try {
      const { data } = await api.post("/users/me/reports", report);
      props.history.push("/backlogs");
    } catch (e) {
      console.log(e);
    }
  };
  console.log("reporter");

  return (
    <div className="container-fluid Slider">
      <h3>Create a report for: {backlog.name} </h3>
      <p className="description">{backlog.desc}</p>

      <div className="container-fluid">
        {reportItems.map((item, idx) => (
          <div className="row SliderRow" key={item.id}>
            <div className="col col-md-2">
              <h4>{item.name}</h4>
            </div>
            <div className="col col-md-9 slider">
              <div className="text-center description">{item.desc}</div>
              <input
                type="range"
                className="custom-range"
                min="0"
                max="100"
                value={item.value}
                onChange={e => onChange(idx, e.target.value)}
              />
            </div>
            <div className="col col-md-1">
              <h4>{item.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="container action">
        <button
          onClick={submitReport}
          className="btn btn-block btn-lg btn-primary"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}
/*
  <table class="table table-hover">
    <tbody>
    {reportItems.map( (item, idx) => (<tr>
        <td><h4>{item.name}</h4></td>
        <td class="slider"><input type="range" className="custom-range mySlide" min="0" max="100" value={item.value} onChange={e => onChange(idx, e.target.value)}/></td>
        <td> <h4>{item.value}</h4></td>
      </tr>))}
    </tbody>
  </table>
*/
//onChange={e => onChange(item.name, e)}
export default Reporter;
