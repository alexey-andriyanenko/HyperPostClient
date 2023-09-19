import { rest } from "msw";
import { packagesMock } from "./packages.mock";

export const createPackagesHandlers = (baseUrl: string) => {
  return [
    rest.get(baseUrl + "/packages", (req, res, ctx) =>
      res(ctx.status(200), ctx.json(packagesMock)),
    ),
  ];
};
