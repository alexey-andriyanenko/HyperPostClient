import { setupServer } from "msw/node";
import { createHandlers } from "./msw-handlers";

export const server = setupServer(...createHandlers());
