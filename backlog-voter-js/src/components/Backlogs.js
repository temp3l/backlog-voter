import React, { useState, useEffect } from "react";
import api from "../services/api";
import Moment from "react-moment";
import "./Backlogs.css";

const HeaderNav = props => {
  const [backlogs, setBacklogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const backlogs = await api("/backlogs");
      setBacklogs(backlogs.data);
    };

    fetchData();
  }, []);

  const navigateToPage = (id) => {
    props.history.push('/backlogs/'+id)
  };

  //{"where": { "backlogId":1 } }
  return (
    <div className="container backlogs">
      {backlogs.map((backlog, i) => {
        return (
          <div className="row backlogRow" key={i} onClick={ (e)=> { navigateToPage(backlog.id) }}>
            <div className="col-md-2">
              <Moment format="DD.MM.YYYY">{backlog.date}</Moment>
            </div>
            <div className="col-md-2" >
              {backlog.name}
            </div>
            <div className="col-md-5">
              <i>{backlog.desc}</i>
            </div>
          </div>
        );
      })}
      
    </div>
  );
};

export default HeaderNav;
