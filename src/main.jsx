import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../src/index.css";
import RoutesIndex from "./routes/RoutesIndex.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutesIndex />
    </BrowserRouter>
  </React.StrictMode>
);
