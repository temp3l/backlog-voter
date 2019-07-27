// import { hot } from "react-hot-loader/root";
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps
} from "react-router-dom";
import Code from "./app/components/Code/Code2";
import HeaderContainer from "./app/components/HeaderContainer/HeaderContainer";
import Hello from "./app/data/containers/Hello";
import JsonForm from "./app/components/JsonForm/JsonForm";
import JsonFormDiag from "./app/components/JsonForm/JsonFormDiag";
import Login from "./app/components/Account/login";
import Markdown from "./app/components/Markdown/Markdown";
import MiniFormik from "./app/components/MiniFormik/MiniFormik";
import Test from "./app/components/Test/Test";

interface IParams {
  id: string;
}

function Product({ match }: RouteComponentProps<IParams>) {
  return <h2>This is a page for product with ID: {match.params.id} </h2>;
}

class App extends React.Component {
  public render() {
    return (
      <div>
        <Router>
          <div>
            <HeaderContainer />
            <div className="container">
              <Route path="/" exact={true} component={MiniFormik} />
              <Route path="/products/:id" component={Product} />
              <Route path="/hello" component={Hello} />
              <Route path="/test" component={Test} />
              <Route path="/login" component={Login} />
              <Route path="/mark/:file" component={Markdown} />
              <Route path="/code/:file" component={Code} />
              <Route path="/jsonForm/:file" component={JsonForm} />
              <Route path="/JsonFormDiag/:file" component={JsonFormDiag} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
