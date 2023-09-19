import { UserStore } from "./user";
import { DepartmentsStore } from "./departments";
import { ModalsStore } from "./modals";
import { PackageCategoriesStore } from "./package-categories";
import { PackagesStore } from "./packages";

export interface IRootStores {
  user: UserStore;
  departments: DepartmentsStore;
  packageCategories: PackageCategoriesStore;
  modals: ModalsStore;
  packages: PackagesStore;
}
