import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModulesContextProvider } from "./context/moduleContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ModulesContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ModulesContextProvider>
);
