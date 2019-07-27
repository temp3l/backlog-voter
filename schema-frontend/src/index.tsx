import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import { EnthusiasmAction } from "./app/data/actions/index";
import { enthusiasm } from "./app/data/reducers/index";
import { IStoreState } from "./app/data/types/index";
import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";

const store = createStore<IStoreState, EnthusiasmAction, any, any>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: "TypeScript"
});

// https://github.com/Microsoft/TypeScript-React-Starter
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
// registerServiceWorker();
