import { setupWorker } from "msw";
import { createHandlers } from "src/mocks";

export const mswWorker = setupWorker(...createHandlers());
