import { rest } from "msw";
import { packageCategoryModelMock } from "src/package-categories-module/models/mocks";

import { packageCategoriesMock } from "./package-categories.mock";

export const createPackageCategoriesMock = (baseUrl: string) => {
  return [
    rest.get(baseUrl + "/package/categories", (req, res, ctx) =>
      res(ctx.status(200), ctx.json(packageCategoriesMock)),
    ),
    rest.post(baseUrl + "/package/categories", (req, res, ctx) =>
      res(ctx.status(200), ctx.json(packageCategoryModelMock)),
    ),
    rest.put(baseUrl + "/package/categories/:id", (req, res, ctx) =>
      res(ctx.status(200), ctx.json(packageCategoryModelMock)),
    ),
    rest.delete(baseUrl + "/package/categories/:id", (req, res, ctx) =>
      res(ctx.status(200), ctx.text("")),
    ),
  ];
};
