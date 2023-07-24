import "@edge-ui/react/styles.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { EdgeUIProvider, Toaster } from "@edge-ui/react";
import { Router } from "./Router.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EdgeUIProvider theme="light">
      <Toaster />
      <Router />
    </EdgeUIProvider>
  </React.StrictMode>
);
