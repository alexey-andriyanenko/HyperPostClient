import { rest } from "msw";
import { departmentsMock } from "./departments.mock";

export const createDepartmentsHandlers = (baseUrl: string) => {
  return [rest.get(baseUrl + "/departments", (req, res, ctx) => res(ctx.json(departmentsMock)))];
};
