import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Moment from "react-moment";
import Spinner from "../Spinner";
import ReportItems from "./ReportItems";

/*

<div class="shadow-none p-3 mb-5 bg-light rounded">No shadow</div>
<div class="shadow-sm p-3 mb-5 bg-white rounded">Small shadow</div>
<div class="shadow p-3 mb-5 bg-white rounded">Regular shadow</div>
<div class="shadow-lg p-3 mb-5 bg-white rounded">Larger shadow</div>

*/
const CreateBacklogForm = props => {
  const [state, setState] = useState({ name: "", desc: "" });
  const [error, setError] = useState(null);
  const onFormSubmit = async event => {
    setError(null);
    event.preventDefault();
    try {
      let { data } = await api.post("/backlogs", state);
      console.log(data);
      props.doFetch(Date.now());
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (

    <div className="container">
    <div className="shadow bg-white p-3 mb-3 rounded">
      <form className="form-inline"  onSubmit={onFormSubmit}>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id="backlogName"
          placeholder="Name"
          value={state.name}
          onChange={e =>
            setState(Object.assign({}, state, { name: e.target.value }))
          }
        />
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id="pwd2"
          placeholder="Description"
          value={state.desc}
          onChange={e =>
            setState(Object.assign({}, state, { desc: e.target.value }))
          }
        />
        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
      
      {error && (
        <pre className="error">{JSON.stringify(error, undefined, 4)}</pre>
      )}
      </div>
    </div>
  );
};


function VoteButtons({session, backlog, removeItem}){
  let completed = backlog.reports.map(rep => rep.ownerId).indexOf(session.id) !== -1;
  return (<div>
      {!completed ? 
        <Link className="btn btn-success btn-sm" to={`/backlogs/${backlog.id}`}>open</Link> 
      : <Link className="btn btn-warning btn-sm disabled" to={`/reports/${backlog.id}`}>closed</Link> 
    }
      {" "}
      {session.isAdmin && (
        <button className="btn btn-danger btn-sm float-right" onClick={e => removeItem(backlog)}>
          <i className="fas fa-trash" />
        </button>
      )}
  </div>)
}


const Backlogs = props => {
  const [backlogs, setBacklogs] = useState(null);
  const [count, updateCount] = useState(0);
  const removeItem = async item => {
    try {
      await api.delete(`/backlogs/${item.id}`);
      updateCount(Date.now());
    } catch (e) {
      alert(JSON.stringify(e.response.data));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const backlogs = await api("/backlogs/?filter[include]=reports");
      setBacklogs(backlogs.data);
    };
    fetchData();
  }, [count]);

  
  if (!backlogs) return <Spinner />;
  const {session, isAdmin} = props;
  return (
      <div>
        {isAdmin && <CreateBacklogForm doFetch={updateCount} />}
        <h4>Backlogs</h4>
        <table className="table backlogTable table-condensed table-hover">
          <thead className="thead-dark">
            <tr>
              <th>created</th>
              <th>Name</th>
              <th>desc</th>
              <th>createReport</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {backlogs && backlogs.map((backlog, i) => {
                            
              return (
                <tr key={backlog.id}>
                  <td>
                    <Moment format="DD.MM.YYYY hh:mm">{backlog.date}</Moment>
                  </td>
                  <td>
                    <b>{backlog.name}</b>
                  </td>
                  <td>
                    <i>{backlog.desc}</i>
                  </td>
                  <td>
                    <VoteButtons session={session} backlog={backlog} removeItem={removeItem}/>
                  </td>
                  <td>{backlog.reports.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br/>
        <br/><br/><br/>
        
        {isAdmin && <ReportItems isAdmin={isAdmin} />}

      </div>
  );
};

export default Backlogs;
