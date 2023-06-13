import { makeAutoObservable } from "mobx";
import { IStoreInterface } from "../store.interface";

import { IUserLoginViaEmailRequest, IUserLoginViaPhoneRequest, userApiService } from "src/api/user";
import { HttpClient } from "src/api/http-client";
import { IUser } from "src/models";

export class UserStore implements IStoreInterface {
  private _user: IUser | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  async loginViaEmail(data: IUserLoginViaEmailRequest) {
    const res = await userApiService.loginViaEmail(data);
    HttpClient.token = res.accessToken;

    return res.id;
  }
  async loginViaPhone(data: IUserLoginViaPhoneRequest) {
    const res = await userApiService.loginViaPhone(data);
    HttpClient.token = res.accessToken;

    return res.id;
  }

  async loadUser(id: number) {
    this._user = await userApiService.loadUser(id);
  }
  logout() {}
}
