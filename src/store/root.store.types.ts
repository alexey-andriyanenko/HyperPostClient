import { UserStore } from "./user";
import { DepartmentsStore } from "./departments";
import { ModalsStore } from "./modals";
import { PackageCategoriesStore } from "./package-categories";

export interface IRootStores {
  user: UserStore;
  departments: DepartmentsStore;
  packageCategories: PackageCategoriesStore;
  modals: ModalsStore;
}
