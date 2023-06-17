import { httpClient } from "../http-client";

import { IUser } from "src/models";
import {
  IUserLoginViaEmailRequest,
  IUserLoginViaPhoneRequest,
  IUserLoginResponse,
} from "./user.api.types";

class UserApiService {
  loginViaEmail(data: IUserLoginViaEmailRequest) {
    return httpClient
      .post<IUserLoginViaEmailRequest, IUserLoginResponse>("/users/login/email")
      .send(data);
  }

  loginViaPhone(data: IUserLoginViaPhoneRequest) {
    return httpClient
      .post<IUserLoginViaPhoneRequest, IUserLoginResponse>("/users/login/phone")
      .send(data);
  }

  loadUser(id: number) {
    return httpClient.get<IUser>("/users/:id").setRouteParams({ id }).send();
  }

  loadMe() {
    return httpClient.get<IUser>("/users/me").send();
  }
}

export const userApiService = new UserApiService();
