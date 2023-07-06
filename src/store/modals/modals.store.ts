import { makeAutoObservable } from "mobx";
import { IStore } from "../store.interface";
import { ModalName, IModalRegistry } from "./modals.store.types";

export class ModalsStore implements IStore {
  private _registry: IModalRegistry = {};

  constructor() {
    makeAutoObservable(this);
  }

  public get registry(): IModalRegistry {
    return this._registry;
  }

  public open<T extends ModalName>(name: T, props: IModalRegistry[T]) {
    this._registry[name] = props;
  }

  public close(name: ModalName) {
    delete this._registry[name];
  }

  public logout() {
    for (const key in this._registry) {
      this.close(key as ModalName);
    }
  }
}
