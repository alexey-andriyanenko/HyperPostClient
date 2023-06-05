import { IStoreInterface } from "./store.interface";
import { IRootStores, TStoreName } from "./root.store.types";
import { UserStore } from "./user";

class RootStore implements IStoreInterface {
  private _stores: IRootStores = {
    user: new UserStore(),
  };
  getStore(name: TStoreName) {
    return this._stores[name];
  }
  logout() {
    Object.values(this._stores).forEach((store) => store.logout());
  }
}

export const rootStore = new RootStore();
