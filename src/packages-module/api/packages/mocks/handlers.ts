import { http, HttpResponse } from "msw";
import { packagesMock } from "./packages.mock";

export const createPackagesHandlers = (baseUrl: string) => {
  return [
    http.get(baseUrl + "/packages", () => HttpResponse.json(packagesMock)),
    http.post(baseUrl + "/packages", () => HttpResponse.json(packagesMock)),
  ];
};
