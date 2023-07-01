import { UserStore } from "./user";
import { DepartmentsStore } from "./departments";

export interface IRootStores {
  user: UserStore;
  departments: DepartmentsStore;
}
