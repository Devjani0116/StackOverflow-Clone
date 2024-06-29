import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { applyMiddleware, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import App from "./App";
import "./index.css";
import Reducers from "./reducers";
const store = createStore(Reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
    <ToastContainer />
      <App />
      
    </React.StrictMode>
  </Provider>
);