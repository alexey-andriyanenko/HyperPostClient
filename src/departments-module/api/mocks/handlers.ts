import { http, HttpResponse } from "msw";
import { departmentsMock } from "./departments.mock";

export const createDepartmentsHandlers = (baseUrl: string) => {
  return [
    http.get(baseUrl + "/departments", () => HttpResponse.json(departmentsMock)),
    http.post(baseUrl + "/departments", () => HttpResponse.json(departmentsMock)),
    http.put(baseUrl + "/departments/:id", () => HttpResponse.json(departmentsMock)),
    http.delete(baseUrl + "/departments/:id", () => HttpResponse.text("")),
  ];
};
