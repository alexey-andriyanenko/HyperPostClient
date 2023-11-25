import "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/user-event";

import { server } from "./msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
