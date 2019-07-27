import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-jsonschema-form";

class MyModal extends React.Component<any, any> {
  public onSubmit = (event: any) => {
    console.log(event);
  };

  public render() {
    const { children, heading, schema, selected } = this.props;
    const tSchema = Object.assign({}, schema, { $schema: undefined });
    delete tSchema.$schema;

    return (
      <Modal
        {...this.props}
        size="lg"
        centered={true}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id="contained-modal-title-vcenter">
            {heading}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {children}
          <h3>{selected}</h3>

          <Form
            {...this.props}
            schema={tSchema}
            onChange={console.log}
            onSubmit={this.onSubmit}
            onError={console.log}
          />

          <pre>{JSON.stringify(schema, null, 3)}</pre>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
    // <pre>{JSON.stringify(t_schema,null,3)}</pre>
  }
}

export default MyModal;
