import * as React from "react";
import { ObjectFieldTemplateProps } from "react-jsonschema-form";

// is the whole form object

function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  return (
    <div>
      {/*
      {props.title}
      {props.description}

      shows one property-wrapper for each input
    	*/}
      {props.properties.map((prop: any) => (
        <div key={prop.content.key} className="property-wrapper">
          {prop.content}
        </div>
      ))}
    </div>
  );
}

export default ObjectFieldTemplate;
