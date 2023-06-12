import { httpClient } from "../http-client";
import {
  IUserLoginViaEmailRequest,
  IUserLoginViaPhoneRequest,
  IUserLoginResponse,
} from "./user.api.types";

class UserApiService {
  loginViaEmail(data: IUserLoginViaEmailRequest) {
    return httpClient.post<IUserLoginViaEmailRequest, IUserLoginResponse>("/login").send(data);
  }

  loginViaPhone(data: IUserLoginViaPhoneRequest) {
    return httpClient.post<IUserLoginViaPhoneRequest, IUserLoginResponse>("/login").send(data);
  }
}

export const userApiService = new UserApiService();
