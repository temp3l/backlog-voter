import axios from "axios";
import * as React from "react";
import ListView from "./ListView";
import SchemaModal from "../Modal/SchemaModal";
import { RouteComponentProps } from "react-router-dom";
import { returnLinks } from "../../../utils/utils";
// https://github.com/swagger-api/swagger-codegen/blob/master/samples/client/petstore/typescript-fetch/builds/default/api.ts

const API = process.env.REACT_APP_API_ENDPOINT;
const API_EXPLORER = process.env.REACT_APP_API_EXPLORER;
const initialState = {};

interface TParams {
  file: string;
}

const ErrorPage = ({ error }: any) => (
  <pre>{JSON.stringify(error, undefined, 3)}</pre>
);

export default class JsonFormDiag extends React.Component<
  RouteComponentProps<TParams>,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = Object.assign({}, initialState, {
      error: null,
      file: props.match.params.file,
      schema: null,
      schemaModalOpen: false,
      selectedItem: null
    });
  }
  fetchSchema = () => {
    axios
      .get(`${API}/item-schemas/${this.state.file}`)
      .then(res => {
        axios
          .get(`${API}/collection-schemas/${this.state.file}`)
          .then(colRes => {
            this.setState({
              collectionSchema: colRes.data,
              schema: res.data,
              collectionName: res.data.collectionName,
              error: res.data.error,
              links: returnLinks(res.data.links, {})
            });
          })
          .catch((error: any) => this.setState({ error }));
      })
      .catch((error: any) => this.setState({ error }));
  };
  componentDidMount = () => {
    this.fetchSchema();
  };
  componentWillReceiveProps = (nextProps: any) => {
    const nextFile = nextProps.match.params.file;
    console.log({ from: this.state.file, to: nextFile });
    if (nextFile === this.state.file) return false;
    this.setState(
      { file: nextFile, schema: null, collectionName: null },
      this.fetchSchema
    );
    return true;
  };
  openSchemaModal = (schema: any, event: any) => {
    this.setState({ schemaModalOpen: true, selectedItem: {} });
    console.log(schema);
    // create the dialog, pass: {onClose, refreshList}
  };
  hideSchemaModal = () => {
    this.setState({ schemaModalOpen: false, selectedItem: null });
  };
  render() {
    // if(this.state.error) return (<ErrorPage error={this.state.error}/>);
    if (!this.state.schema)
      return (
        <>
          <ErrorPage error={this.state.error} /> Loading
        </>
      );

    const {
      schema,
      collectionSchema,
      collectionName,
      links,
      schemaModalOpen
    } = this.state;
    return (
      <div className="container">
        <b>{collectionName}.json.schema</b>
        <ErrorPage error={this.state.error} />
        {schemaModalOpen}
        <button
          onClick={event => this.openSchemaModal(schema, event)}
          type="button"
          className="btn btn-sm btn-success pull-right"
        >
          <i className="fa fa-trash" /> Create
        </button>

        <ul className="apiMenu">
          <li>
            <a target="_blank" href={`${API}/item-schemas/${collectionName}`}>
              item-Schema{" "}
            </a>{" "}
            -{" "}
          </li>
          <li>
            <a
              target="_blank"
              href={`${API}/collection-schemas/${collectionName}`}
            >
              collection-Schema{" "}
            </a>{" "}
            -{" "}
          </li>
          <li>
            <a target="_blank" href={API_EXPLORER}>
              {" "}
              explorer{" "}
            </a>{" "}
            -{" "}
          </li>
          <li>
            <a target="_blank" href={`${API}/${collectionName}`}>
              {" "}
              API{" "}
            </a>{" "}
            -{" "}
          </li>
          <li>
            <a target="_blank" href={`${API_EXPLORER}/swagger.json`}>
              {" "}
              swagger.json -{" "}
            </a>{" "}
          </li>
          <li>
            {" "}
            &nbsp; links: [ {links.map((link: any) => link.rel).join(", ")} ]
          </li>
        </ul>
        <ListView schema={schema} />

        <SchemaModal
          schema={schema}
          selected={this.state.selected}
          links={[
            returnLinks(schema.links, {}).find(
              (item: any) => item.rel === "create"
            )
          ]}
          show={schemaModalOpen}
          onHide={this.hideSchemaModal}
          heading={`"${schema.collectionName}-Schema-form"`}
        />
        <pre>{JSON.stringify(collectionSchema, undefined, 3)}</pre>
      </div>
    ); //
  }

  /*
{
	"$schema": "http://json-schema.org/draft-04/hyper-schema#",
	"collectionName": "simple",
	"type": "array",
	"items": {
		"$ref": "http://localhost:4000/api/item-schemas/simple"
	},
	"links": [{
			"rel": "self",
			"href": "http://localhost:4000/api/simple"
		},
		{
			"rel": "list",
			"href": "http://localhost:4000/api/simple"
		},
		{
			"rel": "add",
			"method": "POST",
			"href": "http://localhost:4000/api/simple",
			"schema": {
				"$ref": "http://localhost:4000/api/item-schemas/simple"
			}
		},
		{
			"rel": "previous",
			"href": "http://localhost:4000/api/simple?filter[limit]={limit}&filter[offset]={previousOffset}{&paginateQs*}"
		},
		{
			"rel": "next",
			"href": "http://localhost:4000/api/simple?filter[limit]={limit}&filter[offset]={nextOffset}{&paginateQs*}"
		},
		{
			"rel": "page",
			"href": "http://localhost:4000/api/simple?filter[limit]={limit}&filter[offset]={offset}{&paginateQs*}"
		},
		{
			"rel": "order",
			"href": "http://localhost:4000/api/simple?filter[order]={orderAttribute}%20{orderDirection}{&orderQs*}"
		}
	]
}
*/
}
