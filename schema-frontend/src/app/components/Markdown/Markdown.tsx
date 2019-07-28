import * as React from "react";
import Spinner from "react-bootstrap/Spinner";
import ReactMarkdown from "react-markdown";
import "./markdown.css";

interface IMyState {
  markdown: string;
  file: string;
  loading: boolean;
}
interface IParams {
  file: string;
}

class MyComponent extends React.Component<IParams, IMyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      file: props.match.params.file,
      loading: false,
      markdown: ""
    };
  }

  public loadMarkdown(file: string) {
    this.setState({ markdown: "", loading: true });
    fetch("/markdown/" + file)
      .then(response => response.text())
      .then(text => {
        this.setState({ markdown: text, loading: false });
      });
  }

  public render() {
    const { markdown, file, loading } = this.state;

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
      <div>
        <ReactMarkdown key={file} source={markdown} className="markdown-body" />
      </div>
    );
  }

  public componentWillMount() {
    this.loadMarkdown(this.state.file);
  }
  public componentDidMount() {
    console.log("mounted !");
  }
  public componentWillReceiveProps(newProps: any) {
    this.loadMarkdown(newProps.match.params.file);
  }
}

export default MyComponent;
