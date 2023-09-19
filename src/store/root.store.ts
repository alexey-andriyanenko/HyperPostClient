import { IStore } from "./store.interface";
import { IRootStores } from "./root.store.types";
import { UserStore } from "./user";
import { DepartmentsStore } from "./departments";
import { ModalsStore } from "./modals";
import { PackageCategoriesStore } from "./package-categories";
import { PackagesStore } from "./packages";

class RootStore implements IStore {
  private _stores: IRootStores = {
    user: new UserStore(),
    departments: new DepartmentsStore(),
    packageCategories: new PackageCategoriesStore(),
    modals: new ModalsStore(),
    packages: new PackagesStore(),
  };

  getStore<T extends keyof IRootStores>(name: T): IRootStores[T] {
    return this._stores[name];
  }

  logout() {
    Object.values(this._stores).forEach((store) => store.logout());
  }
}

export const rootStore = new RootStore();
