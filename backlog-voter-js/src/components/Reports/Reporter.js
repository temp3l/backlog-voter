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
          Object.assign(item, { value: getRandomInt(2) })
        )
      );
      let interval = setInterval(() => {
        setReportItems(
          reportItems.data.map(item =>
            Object.assign(item, { value: Math.round(item.value + 1) })
          )
        );
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        setReportItems(
          reportItems.data.map(item =>
            Object.assign(item, { value: 10 })
          )
        );
      }, 1000);
    };
    fetchData();
  }, [backlogId]);

  const onChange = (idx, evt) => {
    let obj = reportItems.slice();
    obj[idx].value = evt;
    setReportItems(obj);
  };




const calculateResults = (reportItems) => {
  console.log(reportItems)
  let totalScore = 0;
  let score = 0;
  reportItems.forEach(item => {
    totalScore += 20 * item.modifier;
    score += Number( item.value) * Number(item.modifier );
  });
  let scoreP = score * 100 / totalScore;
  return { 
    totalScore: Math.round(totalScore/reportItems.length),
    score: Math.round(score/reportItems.length), 
    scoreP: Math.round(scoreP),
    humanScore: Math.round(20/100*scoreP )
  }
}


  const submitReport = async () => {
    let report = Object.assign(
      { backlogId: backlog.id, userId: props.session.id },
      { data: reportItems, results: calculateResults(reportItems) },
    );
      alert(JSON.stringify(report.results,undefined,4))
    
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
      <p className="description">{backlog.description}</p>

      <div className="container-fluid">
        {reportItems.map((item, idx) => (
          <div className="row SliderRow" key={item.id}>
            <div className="col col-md-2 col-sm-12">
              <h4>{item.name}</h4>
            </div>
            <div className="col col-md-9 col-sm-10 slider">
              <div className="text-center description">{item.description}</div>
              <input
                type="range"
                className="custom-range"
                min="0"
                max="20"
                value={item.value}
                onChange={e => onChange(idx, e.target.value)}
              />
            </div>
            <div className="col col-md-1 col-sm-2">
              <h4> <span className="badge badge-secondary">{item.value}</span></h4>
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

export default Reporter;
