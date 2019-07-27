import * as React from "react";
import { AjvError, ErrorListProps } from "react-jsonschema-form";

// @ts-ignore
function ErrorListTemplateBootstrap(props: ErrorListProps) {
  const { errors } = props;
  return (
    <div className="panel panel-danger errors">
      <div className="panel-heading">
        <h3 className="panel-title">Errors</h3>
      </div>
      <ul className="list-group">
        {errors.map((error, i) => {
          return (
            <li key={i} className="list-group-item text-danger">
              {error.stack}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ErrorListTemplate(props: ErrorListProps) {
  const { errors } = props;
  return (
    <ul>
      {errors.map((error: AjvError) => (
        <li key={error.stack}>{error.stack}</li>
      ))}
    </ul>
  );
}

export default ErrorListTemplate;
