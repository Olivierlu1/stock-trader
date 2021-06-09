import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers/index";
import Header from "./components/Header";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducers)}>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
