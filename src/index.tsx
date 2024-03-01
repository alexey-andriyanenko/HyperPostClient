import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { App } from "./core-module/app";
import { checkForBrowserMocking } from "./msw/msw-browser";

checkForBrowserMocking().then(() => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
});
