import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Spinner from "../Spinner";

const endPoint = '/reportItems'

const CreateReportItemForm = props => {
  const [state, setState] = useState({ name: "", desc: "" });
  const [error, setError] = useState(null);

  const onFormSubmit = async event => {
    setError(null);
    event.preventDefault();
    try {
      let { data } = await api.post(endPoint, state);
      console.log(data);
      props.doFetch(Date.now());
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="container shadow bg-white p-3 mb-3 rounded">
      <form className="form-inline" onSubmit={onFormSubmit}>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id="reportItemName"
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
  );
};

const ReportsItems = props => {
  const [reportItems, setReportItems] = useState(null);
  const [count, updateCount] = useState(0);
  const { isAdmin } = props;

  const removeItem = async item => {
    try {
      await api.delete(`/reportItems/${item.id}`);
      updateCount(Date.now());
    } catch (e) {
      alert(JSON.stringify(e.response.data));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const reportItems = await api(endPoint);
      setReportItems(reportItems.data);
    };
    fetchData();
  }, [count]);

  if (!reportItems) return <Spinner />;

  return (
    <div className="reportItems">
      {isAdmin && <CreateReportItemForm doFetch={updateCount} />}

      <h4>ReportItems</h4>
      <table className="table reportItemTable table-condensed table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>desc</th>
            <th>del</th>
          </tr>
        </thead>
        <tbody>
          {reportItems.map((reportItem, i) => {
            return (
              <tr key={reportItem.id}>
                <td>
                  <b>{reportItem.name}</b>
                </td>
                <td>
                  <i>{reportItem.desc}</i>
                </td>
                <td>
                  {isAdmin && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={e => removeItem(reportItem)}
                    >
                      {" "}
                      <i className="fas fa-trash" />{" "}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsItems;
