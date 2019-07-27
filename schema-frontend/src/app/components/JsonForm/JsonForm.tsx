import * as React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-jsonschema-form";
import {
  AjvError,
  ArrayFieldTemplateProps,
  ErrorSchema,
  FieldTemplateProps,
  FormValidation,
  IChangeEvent,
  ISubmitEvent,
  ObjectFieldTemplateProps
} from "react-jsonschema-form";
import { log, timeout } from "../../../utils/utils";
import Loop from "../Loop/Loop";
import MyModal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";
import "./JsonForm.css";
import resolveAkeliusSchema from "./samples/akelius";
import resolveSchema from "./samples/generic";

interface IMyState {
  loading: boolean;
  file: string;
  schema: object;
  form: boolean;
  uiSchema: object;
  formData: object;
  liveSettings: { validate: boolean; disable: boolean };
  errors: any[];
  FieldTemplate?: React.StatelessComponent<FieldTemplateProps>;
  ArrayFieldTemplate?: React.StatelessComponent<ArrayFieldTemplateProps>;
  ObjectFieldTemplate?: React.StatelessComponent<ObjectFieldTemplateProps>;

  transformErrors?: (errors: AjvError[]) => AjvError[];
  validate?: (formData: object, errors: FormValidation) => FormValidation;
  onSubmit?: (e: ISubmitEvent<any>) => any;
  onChange?: (e: IChangeEvent<any>, es?: ErrorSchema) => any;

  modalShow: boolean;
}

const initialState = {
  errors: [],
  file: "none",
  form: false,
  formData: {},
  liveSettings: { validate: true, disable: false },
  loading: true,
  modalShow: false,
  schema: {},
  transformErrors: (errors: any) => errors,
  uiSchema: {},
  validate: (formData: any, errors: any) => errors
};

class JsonForm extends React.Component<any, IMyState> {
  constructor(props: any) {
    super(props);

    this.state = Object.assign({}, initialState, {
      file: props.match.params.file || "simple"
    });
  }

  // just playing with schemas  and fetching stuff in the client
  public async loadFormSource(file: string) {
    let data;
    if (file === "Akelius") {
      data = await resolveAkeliusSchema(); // to be removed
      await timeout(1000);
    } else {
      data = await resolveSchema(file); // load all form-relevant data (schema,uiSchema, validator, templates)
    }
    this.setState({ ...data, loading: false, file, form: true });
  }

  public componentDidUpdate(prevProps: any) {
    const prevFile = prevProps.match.params.file;
    const nextFile = this.props.match.params.file;
    if (prevFile !== nextFile) {
      this.setState(Object.assign({}, initialState, { file: nextFile }));
      this.loadFormSource(nextFile);
    }
  }
  public componentDidMount() {
    this.loadFormSource(this.state.file);
  }

  public onFormSubmit = (event: ISubmitEvent<any>) => {
    const { errors, errorSchema, formData, schema } = event;
    console.log(errors, errorSchema, formData, schema);
    this.setState({ modalShow: true });
  };

  public onFormDataChange = (event: IChangeEvent, es: ErrorSchema) => {
    const { errors, formData } = event;
    this.setState((state, props) => {
      return {
        errors,
        formData
      };
    });
  };

  public resetFormData = () => this.setState({ formData: {} });

  public render() {
    const modalClose = () => this.setState({ modalShow: false });
    const {
      schema,
      errors,
      uiSchema,
      formData,
      liveSettings,
      transformErrors,
      validate,
      loading,
      modalShow
    } = this.state;

    if (loading === true) {
      return <Spinner />;
    }
    // alert(process.env.REACT_APP_API_ENDPOINT)
    return (
      <div className="container">
        <MyModal show={modalShow} onHide={modalClose} heading="Form debug">
          <Alert variant="success">
            <Alert.Heading>Submitted for asycValidation</Alert.Heading>
            <pre>{JSON.stringify(formData, undefined, 4)}</pre>
            <hr />
            <div className="mb-0">
              <p>There should be no Errors; No Style</p>
              <pre>{JSON.stringify(errors, undefined, 4)}</pre>
            </div>
          </Alert>
        </MyModal>

        {this.state.form && schema && (
          <div>
            {/*
              <ListView schema={schema} />
             */}
            <br /> <br />
            <Form
              schema={schema}
              uiSchema={uiSchema}
              formData={formData}
              liveValidate={liveSettings.validate}
              validate={validate}
              disabled={liveSettings.disable}
              showErrorList={false}
              noHtml5Validate={true}
              autocomplete="on"
              transformErrors={transformErrors}
              onError={log("errors")}
              onSubmit={this.onFormSubmit}
              onChange={this.onFormDataChange}
            >
              <div className="row">
                <div className="col-md-4">
                  <Button
                    disabled={errors.length > 0}
                    variant={errors.length > 0 ? "danger" : "success"}
                    type="submit"
                    block={true}
                  >
                    Submit{" "}
                  </Button>
                </div>
                <div className="col-md-4">
                  <Button
                    onClick={this.resetFormData}
                    variant="warning"
                    block={true}
                  >
                    Reset{" "}
                  </Button>
                </div>
              </div>
            </Form>
            <br />
            <br />
            <Loop schema={schema} />
          </div>
        )}
        <br />
        <br />

        <pre>{JSON.stringify(formData, undefined, 4)}</pre>
        {errors.length > 0 && <pre>{JSON.stringify(errors, undefined, 4)}</pre>}
      </div>
    );
  }
}
/*
  fields={{ geo: GeoPosition }}
  onBlur={(id, value) => console.log(`Touched ${id} with value ${value}`) }
  onFocus={(id, value) => console.log(`Focused ${id} with value ${value}`) }
  ArrayFieldTemplate,  ObjectFieldTemplate, FieldTemplate,
  // handle from resolveSchema function => rename
  ErrorList={ELT}
  ObjectFieldTemplate={ObjectFieldTemplate}
  ArrayFieldTemplate={ArrayFieldTemplate}
  FieldTemplate={FieldTemplate}
*/
export default JsonForm;
