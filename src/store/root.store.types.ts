import { UserStore } from "./user";

export type TStoreName = "user";
export interface IRootStores {
  user: UserStore;
}
