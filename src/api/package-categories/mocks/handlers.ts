import { rest } from "msw";
import { packageCategoriesMock } from "./package-categories.mock";

export const createPackageCategoriesMock = (baseUrl: string) => {
  return [
    rest.get(baseUrl + "/package/categories", (req, res, ctx) =>
      res(ctx.status(200), ctx.json(packageCategoriesMock)),
    ),
  ];
};