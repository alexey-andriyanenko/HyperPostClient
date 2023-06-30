import { makeAutoObservable, runInAction } from "mobx";
import { IStore } from "../store.interface";

import {
  IUpdateMeRequest,
  IUserLoginViaEmailRequest,
  IUserLoginViaPhoneRequest,
  userApiService,
} from "src/api/user";
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

    runInAction(() => {
      HttpClient.token = res.accessToken;
      this._storeToken(res.accessToken);
      this._loggedIn = true;
    });

    return res.id;
  }
  async loginViaPhone(data: IUserLoginViaPhoneRequest): Promise<number> {
    const res = await userApiService.loginViaPhone(data);

    runInAction(() => {
      HttpClient.token = res.accessToken;
      this._storeToken(res.accessToken);
      this._loggedIn = true;
    });

    return res.id;
  }

  async loadMe() {
    try {
      const result = await userApiService.loadMe();

      runInAction(() => {
        this._user = result;
        this._storeUser(result);
      });
    } catch (e) {
      this.logout();
    }
  }

  async updateMe(data: IUpdateMeRequest) {
    if (!this._user) return;

    const result = await userApiService.updateMe(data);

    runInAction(() => {
      this._user = result;
      this._storeUser(result);
    });
  }

  logout() {
    this._user = null;
    this._loggedIn = false;
  }

  private _storeToken(token: string) {
    localStorage.setItem("token", token);
  }

  private _storeUser(user: IUser) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}
