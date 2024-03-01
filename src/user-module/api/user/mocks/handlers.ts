import { http, HttpResponse } from "msw";
import { loginMock } from "./login.mock";
import { adminMock } from "./admin.mock";
import { clientMock } from "./client.mock";

export const createUserHandlers = (baseUrl: string) => {
  return [
    http.post(baseUrl + "/users/login/phone", () => HttpResponse.json(loginMock)),
    http.post(baseUrl + "/users/login/email", () => HttpResponse.json(loginMock)),
    http.get(baseUrl + "/users/me", () => HttpResponse.json(adminMock)),
    http.put(baseUrl + "/users/me", () => HttpResponse.json(adminMock)),
    http.get(baseUrl + "/users/check/exists", () => HttpResponse.json(clientMock)),
  ];
};
