import { rest } from "msw";
import { departmentsMock } from "./departments.mock";

export const createDepartmentsHandlers = (baseUrl: string) => {
  return [
    rest.get(baseUrl + "/departments", (req, res, ctx) =>
      res(ctx.status(200), ctx.json(departmentsMock)),
    ),
    rest.post(baseUrl + "/departments", (req, res, ctx) =>
      res(ctx.status(201), ctx.json(departmentsMock)),
    ),
  ];
};
