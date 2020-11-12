import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { CurrentUserProvider } from "./CurrentUserContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <Router>
        <App />
      </Router>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
