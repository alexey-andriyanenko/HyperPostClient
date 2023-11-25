import { httpClient } from "src/shared-module/api";

import { ILoginResponse, ILoginViaEmailRequest, ILoginViaPhoneRequest } from "./auth.types";

class AuthApiService {
  loginViaEmail(data: ILoginViaEmailRequest) {
    return httpClient.post<ILoginViaEmailRequest, ILoginResponse>("/users/login/email").send(data);
  }

  loginViaPhone(data: ILoginViaPhoneRequest) {
    return httpClient.post<ILoginViaPhoneRequest, ILoginResponse>("/users/login/phone").send(data);
  }
}

export const authApiService = new AuthApiService();
