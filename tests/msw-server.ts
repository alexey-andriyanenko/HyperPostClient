import { setupServer } from "msw/node";
import { createHandlers } from "src/mocks/handlers";

export const server = setupServer(...createHandlers());
