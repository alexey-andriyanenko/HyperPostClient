import { UserStore } from "./user";
import { DepartmentsStore } from "./departments";
import { ModalsStore } from "./modals";

export interface IRootStores {
  user: UserStore;
  departments: DepartmentsStore;
  modals: ModalsStore;
}
