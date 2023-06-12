import { makeAutoObservable } from "mobx";
import { IStoreInterface } from "../store.interface";
import {
  IUserLoginViaEmailRequest,
  IUserLoginViaPhoneRequest,
} from "../../api/user/user.api.types";

export class UserStore implements IStoreInterface {
  constructor() {
    makeAutoObservable(this);
  }

  loginViaEmail(data: IUserLoginViaEmailRequest) {}
  loginViaPhone(data: IUserLoginViaPhoneRequest) {}
  logout() {}
}
