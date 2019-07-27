import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface IParams {
  schema: object;
}
interface IMyState {
  schema: object;
  show: boolean;
  error: object;
  reply: object;
  collectionName: string;
}

// const host = "10.50.2.115";
const host = "localhost";
class Loop extends React.Component<IParams, IMyState> {
  constructor(props: any) {
    super(props);
    this.state = { ...props, show: false };
  }

  public componentDidMount() {
    // console.log(this.state);
  }

  public createEndpoint = async () => {
    const { schema } = this.state;
    const reply = await fetch("http://" + host + ":4000/api/item-schemas", {
      body: JSON.stringify(schema),
      headers: { "Content-Type": "application/json" },
      method: "post"
    }).then(res => res.json());
    this.setState({ reply });
  };

  public render() {
    const { schema } = this.state;
    // tslint:disable-next-line: no-string-literal
    const collectionName = schema["collectionName"];

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Button
                // tslint:disable-next-line: jsx-no-lambda
                onClick={() => this.setState({ show: true })}
                variant="info"
                block={true}
              >
                create Endpoint: {collectionName}
              </Button>
            </div>
          </div>
        </div>

        <Modal
          size="lg"
          show={this.state.show}
          // tslint:disable-next-line: jsx-no-lambda
          onHide={() => this.setState({ show: false })}
          dialogClassName="modal-90w"
        >
          <Modal.Header closeButton={true} />
          <Modal.Body>
            <ul>
              <li />
              <li>
                {" "}
                <a href={`http://${host}:4000/explorer/`} target="_">
                  ${host}:4000/api/explorer
                </a>
              </li>
              <li>
                {" "}
                <a href={`http://${host}:4001/graphql/`} target="_">
                  ${host}:4001/graphQL
                </a>
              </li>
            </ul>
            <Button onClick={this.createEndpoint}>create</Button>
            <pre>{JSON.stringify(this.state.reply, undefined, 1)}</pre>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Loop;
