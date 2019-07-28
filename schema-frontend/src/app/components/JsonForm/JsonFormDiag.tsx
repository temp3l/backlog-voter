import axios from "axios";
import * as React from "react";
import ListView from "./ListView";
import SchemaModal from "../Modal/SchemaModal";
import { RouteComponentProps } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import ApiMenu from "./ApiMenu";
import asyncFetch from "../../../utils/fetchAPI";
axios.interceptors.response.use(response => response.data);

const API = process.env.REACT_APP_API_ENDPOINT;
const initialState = {};
interface ITParams {
  file: string;
}

const ErrorPage = ({ error }: any) => (
  <pre>{JSON.stringify(error, undefined, 3)}</pre>
);

const multiFetch = (name: string): Promise<object[] | void> => {
  return axios.all([
    axios.get(`${API}/item-schemas/${name}`),
    axios.get(`${API}/collection-schemas/${name}`)
  ]);
};

export default class JsonFormDiag extends React.Component<RouteComponentProps<ITParams>,any> {
  constructor(props: any) {
    super(props);
    this.state = Object.assign({}, initialState, {
      error: null,
      file: props.match.params.file,
      links: [],
      loading: true,
      schema: null,
      schemaModalOpen: false,
      selectedItem: null
    });
  }

  public fetchSchema = (props) => {
    axios
      .get(`${API}/item-schemas/${this.state.file}`)
      .then(res => {
        axios
          .get(`${API}/collection-schemas/${this.state.file}`)
          .then(colRes => {
            this.setState({
              collectionName: res.data.collectionName,
              collectionSchema: colRes.data,
              error: null,
              loading: false,
              schema: res.data
            });
          })
          .catch((error: any) => this.setState({ error }));
      })
      .catch((error: any) => this.setState({ error }));
  };

  public componentDidMount = () => {
    multiFetch(this.state.file).then(data => {
      const [itemSchema, ollectionSchema]:any = data;

      console.log([itemSchema, ollectionSchema]);
    });
  };
  public componentWillReceiveProps = (nextProps: any) => {
    const nextFile = nextProps.match.params.file;
    console.log({ from: this.state.file, to: nextFile });
    if (nextFile === this.state.file) {
      return false;
    }
    this.setState({ file: nextFile, schema: null, collectionName: null }, () =>
      this.fetchSchema(this.state.file)
    );
    return true;
  };
  public openSchemaModal = (schema: any, event: any) => {
    this.setState({ schemaModalOpen: true, selectedItem: {} });
    // create the dialog, pass: {onClose, refreshList}
  };
  public hideSchemaModal = () => {
    this.setState({ schemaModalOpen: false, selectedItem: null });
  };
  public render() {
    if (this.state.error) {
      return <ErrorPage error={this.state.error} />;
    }
    if (this.state.loading || !this.state.schema) {
      return <Spinner />;
    }
    const {
      schema,
      collectionSchema,
      collectionName,
      schemaModalOpen
    } = this.state;

    return (
      <div className="container">
        <b>{collectionName}.json.schema</b>

        <button
          type="button"
          className="btn btn-sm btn-success pull-right"
          // tslint:disable-next-line: jsx-no-lambda
          onClick={event => this.openSchemaModal(schema, event)}
        >
          <i className="fa fa-trash" /> Create
        </button>

        {schema && schema.links && schema.links.length && (
          <ApiMenu schema={collectionSchema} collectionName={collectionName} />
        )}

        <ListView schema={schema} />

        <SchemaModal
          schema={schema}
          selected={this.state.selected}
          show={schemaModalOpen}
          onHide={this.hideSchemaModal}
          heading={`${collectionName}-Schema-form`}
        />

        <pre>{JSON.stringify(schema, undefined, 3)}</pre>
      </div>
    );
  }
}
