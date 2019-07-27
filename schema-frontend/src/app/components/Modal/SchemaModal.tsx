import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-jsonschema-form";

class MyModal extends React.Component<any, any> {
  private onSubmit = (event: any) => {
    console.log(event);
  };

  render() {
    const { children, heading, schema, selected } = this.props;
    const _schema = Object.assign({}, schema, { $schema: undefined });
    delete _schema.$schema;

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
            schema={_schema}
            onChange={() => console.log("changed")}
            onSubmit={this.onSubmit}
            onError={() => console.log("errors")}
          />

          <pre>{JSON.stringify(schema, null, 3)}</pre>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
    // <pre>{JSON.stringify(_schema,null,3)}</pre>
  }
}

export default MyModal;
