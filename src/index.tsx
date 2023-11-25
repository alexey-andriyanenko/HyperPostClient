import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { App } from "./core-module/app";
// import { mswWorker } from "./shared-module/msw";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// if (ENABLE_MOCK) mswWorker.start();
