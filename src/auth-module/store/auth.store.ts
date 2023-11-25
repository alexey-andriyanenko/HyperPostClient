import { makeAutoObservable, runInAction } from "mobx";

import { HttpClient } from "src/shared-module/api";
import { eventBus } from "src/event-bus";

import { authApiService, ILoginViaEmailRequest, ILoginViaPhoneRequest } from "../api";

class AuthStore {
  private _isLogged = !!localStorage.getItem("token");

  constructor() {
    makeAutoObservable(this);
    eventBus.on("logout", this._clear.bind(this));
  }

  public get isLogged() {
    return this._isLogged;
  }

  async loginViaEmail(data: ILoginViaEmailRequest): Promise<void> {
    const res = await authApiService.loginViaEmail(data);

    runInAction(() => {
      HttpClient.token = res.accessToken;
      this._isLogged = true;

      this._storeToken(res.accessToken);
      eventBus.emit("login");
    });
  }
  async loginViaPhone(data: ILoginViaPhoneRequest): Promise<void> {
    const res = await authApiService.loginViaPhone(data);

    runInAction(() => {
      HttpClient.token = res.accessToken;
      this._isLogged = true;

      this._storeToken(res.accessToken);
      eventBus.emit("login");
    });
  }

  private _clear() {
    this._isLogged = false;
    localStorage.removeItem("token");
  }

  private _storeToken(token: string) {
    localStorage.setItem("token", token);
  }
}

export const authStore = new AuthStore();
