import { IStore } from "./store.interface";
import { IRootStores } from "./root.store.types";
import { UserStore } from "./user";
class RootStore implements IStore {
  private _stores: IRootStores = {
    user: new UserStore(),
  };

  getStore<T extends keyof IRootStores>(name: T): IRootStores[T] {
    return this._stores[name];
  }

  logout() {
    Object.values(this._stores).forEach((store) => store.logout());
  }
}

export const rootStore = new RootStore();
