import { http, HttpResponse } from "msw";
import { packageCategoryModelMock } from "src/package-categories-module/models/mocks";

import { packageCategoriesMock } from "./package-categories.mock";

export const createPackageCategoriesMock = (baseUrl: string) => {
  return [
    http.get(baseUrl + "/package/categories", () => HttpResponse.json(packageCategoriesMock)),
    http.post(baseUrl + "/package/categories", () => HttpResponse.json(packageCategoryModelMock)),
    http.put(baseUrl + "/package/categories/:id", () =>
      HttpResponse.json(packageCategoryModelMock),
    ),
    http.delete(baseUrl + "/package/categories/:id", () => HttpResponse.text("")),
  ];
};
