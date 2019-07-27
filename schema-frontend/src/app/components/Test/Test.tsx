import * as React from "react";
import "./Test.scss";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Test = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6" />
      <SwaggerUI url="http://localhost:3000/petstore.json" />
    </div>
  </div>
);

export default Test;
