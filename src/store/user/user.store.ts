import { makeAutoObservable } from "mobx";
import { IStoreInterface } from "../store.interface";

export class UserStore implements IStoreInterface {
  constructor() {
    makeAutoObservable(this);
  }

  logout() {}
}
