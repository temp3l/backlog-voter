import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import * as React from "react";
import Spinner from "react-bootstrap/Spinner";
import { LineNo, Pre } from "./styles";

interface IMyState {
  code: string;
  file: string;
  loading: boolean;
}
interface IParams {
  file: string;
}

class Code2 extends React.Component<IParams, IMyState> {
  constructor(props: any) {
    super(props);

    console.log(this.props);
    console.log(props);
    const {
      match: {
        params: { file }
      }
    } = props;
    this.state = {
      code: "{}",
      file,
      loading: false
    };
  }

  public loadCode(file: string) {
    this.setState({ code: "", loading: true });
    fetch("/schemas/" + file)
      .then(response => response.text())
      .then(text => {
        this.setState({ code: text, loading: false, file });
      });
  }

  public render() {
    const { code, file, loading } = this.state;

    if (loading === true) {
      return (
        <div className="container">
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
        </div>
      );
    }

    return (
      <div className="container">
        <h3>{file}</h3>
        <br />
        <Highlight {...defaultProps} theme={theme} code={code} language="json">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </Pre>
          )}
        </Highlight>
      </div>
    );
  }

  public componentWillMount() {
    this.loadCode(this.state.file);
  }
  public componentDidMount() {
    console.log("mounted !");
  }
  public componentWillReceiveProps(newProps: any) {
    this.loadCode(newProps.match.params.file);
  }
}
/*
const fs = require('fs')
const $RefParser = require('json-schema-ref-parser');


$RefParser.bundle("http://localhost:3000/schemas/user.schema.json#").then(function(schema) {
  // now only internal refs -> stringify
  // console.log(JSON.stringify(schema));
  fs.writeFileSync('./bundle.schema.json', JSON.stringify(schema, undefined, 4))
}); 
 */

export default Code2;
