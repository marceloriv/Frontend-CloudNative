import React from "react";
import ReactDOM from "react-dom/client";
import { bind } from "cuelume";
import App from "./App";
import "./index.css";
import "./app.css";

bind();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
