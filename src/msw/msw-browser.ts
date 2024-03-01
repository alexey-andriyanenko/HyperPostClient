import { setupWorker } from "msw/browser";
import { createHandlers } from "./msw-handlers";

// should not be re-exported from index.ts because it will include msw-node configuration in build which
// will not work in browser environment
export const checkForBrowserMocking = async () => {
  if (!ENABLE_MOCK) return;

  const worker = setupWorker(...createHandlers());
  return await worker.start();
};
