import { rest } from "msw";
import { loginMock } from "./login.mock";
import { adminMock } from "./admin.mock";
import { clientMock } from "./client.mock";

export const createUserHandlers = (baseUrl: string) => {
  return [
    rest.post(baseUrl + "/users/login/phone", (req, res, ctx) => {
      return res(ctx.json(loginMock));
    }),
    rest.post(baseUrl + "/users/login/email", (req, res, ctx) => {
      return res(ctx.json(loginMock));
    }),
    rest.get(baseUrl + "/users/me", (req, res, ctx) => {
      return res(ctx.json(adminMock));
    }),
    rest.put(baseUrl + "/users/me", (req, res, ctx) => {
      return res(ctx.json(adminMock));
    }),
    rest.get(baseUrl + "/users/check/exists", (req, res, ctx) => {
      return res(ctx.json(clientMock));
    }),
  ];
};
