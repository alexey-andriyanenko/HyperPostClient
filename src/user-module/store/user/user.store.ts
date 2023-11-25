import { makeAutoObservable, runInAction } from "mobx";

import { eventBus } from "src/event-bus";

import { IUpdateMeRequest, userApiService } from "src/user-module/api/user";
import { IUser } from "src/user-module/models";

class UserStore {
  private _user: IUser | null = JSON.parse(localStorage.getItem("user") || "null");

  get user() {
    return this._user;
  }

  constructor() {
    makeAutoObservable(this);
    eventBus.on("logout", this._clear.bind(this));
  }

  async loadMe() {
    try {
      const result = await userApiService.loadMe();

      runInAction(() => {
        this._user = result;
        this._storeUser(result);
      });
    } catch (e) {
      this._clear();
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

  private _clear() {
    this._user = null;
    localStorage.removeItem("user");
  }

  private _storeUser(user: IUser) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export const userStore = new UserStore();
