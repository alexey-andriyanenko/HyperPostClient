import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { App } from "./app";
import { mswWorker } from "./msw-worker";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

if (ENABLE_MOCK) mswWorker.start();
