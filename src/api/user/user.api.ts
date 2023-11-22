import { httpClient } from "../http-client";

import { IUser } from "src/models";
import {
  IUserLoginViaEmailRequest,
  IUserLoginViaPhoneRequest,
  IUserLoginResponse,
  IUserUpdateRequest,
  IUpdateMeRequest,
  TCheckIfUserExistsRequest,
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

  updateUser(data: IUserUpdateRequest, userId: number) {
    return httpClient
      .put<IUserUpdateRequest, IUser>("/users/:id")
      .setRouteParams({
        id: userId,
      })
      .send(data);
  }

  checkIfUserExists(data: TCheckIfUserExistsRequest) {
    return httpClient.get<IUser>("/users/check/exists").setSearchParams(data).send();
  }

  updateMe(data: IUpdateMeRequest) {
    return httpClient.put<IUpdateMeRequest, IUser>("/users/me").send(data);
  }

  loadMe() {
    return httpClient.get<IUser>("/users/me").send();
  }
}

export const userApiService = new UserApiService();
