import * as React from "react";

const ApiMenu = ({ schema }: any) => {
  const { REACT_APP_API_ENDPOINT, REACT_APP_API_EXPLORER } = process.env;
  const { links, collectionName } = schema;

  return (
    <>
      <ul className="apiMenu">
        <li>
          <a
            target="_blank"
            href={`${REACT_APP_API_ENDPOINT}/item-schemas/${collectionName}`}
          >
            item-Schema
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href={`${REACT_APP_API_ENDPOINT}/collection-schemas/${collectionName}`}
          >
            collection-Schema
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href={`${REACT_APP_API_ENDPOINT}/${collectionName}`}
          >
            API
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href={`${REACT_APP_API_EXPLORER}/#!/${collectionName}/${collectionName}_find`}
          >
            explorer
          </a>
        </li>
        <li>
          <a target="_blank" href={`${REACT_APP_API_EXPLORER}/swagger.json`}>
            swagger.json
          </a>
        </li>
        <li>
          {" "}
          links: [ <i>{links.map((link: any) => link.rel).join(", ")} </i>]
        </li>
      </ul>
    </>
  );
};

export default ApiMenu;
