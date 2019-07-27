import * as React from "react";
import { ArrayFieldTemplateProps } from "react-jsonschema-form";

function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  return (
    <div className={props.className}>
      {props.items &&
        props.items.map((element: any) => (
          <div key={element.index}>
            <div>{element.children}</div>
            {element.hasMoveDown && (
              <button
                onClick={element.onReorderClick(
                  element.index,
                  element.index + 1
                )}
              >
                Down
              </button>
            )}
            {element.hasMoveUp && (
              <button
                onClick={element.onReorderClick(
                  element.index,
                  element.index - 1
                )}
              >
                Up
              </button>
            )}
            <button onClick={element.onDropIndexClick(element.index)}>-</button>
            <hr />
          </div>
        ))}

      {props.canAdd && (
        <div className="row">
          <p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
            <button onClick={props.onAddClick} type="button">
              +
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default ArrayFieldTemplate;
