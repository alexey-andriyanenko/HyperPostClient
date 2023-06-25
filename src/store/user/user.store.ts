import { makeAutoObservable } from "mobx";
import { IStore } from "../store.interface";

import { IUserLoginViaEmailRequest, IUserLoginViaPhoneRequest, userApiService } from "src/api/user";
import { HttpClient } from "src/api/http-client";
import { IUser } from "src/models";

export class UserStore implements IStore {
  private _loggedIn = localStorage.getItem("token") !== null;
  private _user: IUser | null = JSON.parse(localStorage.getItem("user") || "null");

  get user() {
    return this._user;
  }

  get loggedIn() {
    return this._loggedIn;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async loginViaEmail(data: IUserLoginViaEmailRequest): Promise<number> {
    const res = await userApiService.loginViaEmail(data);

    HttpClient.token = res.accessToken;
    this._storeToken(res.accessToken);
    this._loggedIn = true;

    return res.id;
  }
  async loginViaPhone(data: IUserLoginViaPhoneRequest): Promise<number> {
    const res = await userApiService.loginViaPhone(data);

    HttpClient.token = res.accessToken;
    this._storeToken(res.accessToken);
    this._loggedIn = true;

    return res.id;
  }

  async loadMe() {
    this._user = await userApiService.loadMe();
  }
  logout() {}

  private _storeToken(token: string) {
    localStorage.setItem("token", token);
  }
}
