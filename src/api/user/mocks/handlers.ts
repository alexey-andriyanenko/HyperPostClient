import { rest } from "msw";
import { loginMock } from "./login.mock";
import { adminMock } from "./admin.mock";

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
  ];
};
