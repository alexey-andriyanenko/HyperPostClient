import { TPaginationRequest } from "./pagination";

export type TPackageCategoriesFilters = TPaginationRequest & {
  name?: string;
};
