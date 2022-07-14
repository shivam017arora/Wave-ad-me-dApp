import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <MoralisProvider initializeOnMount={false}>
    <App />
  </MoralisProvider>,
  document.getElementById("root")
);
