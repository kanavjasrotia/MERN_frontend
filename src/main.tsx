import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import Test from "./Test.tsx";
import "./scss/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {/* <Test /> */}
  </React.StrictMode>
);
