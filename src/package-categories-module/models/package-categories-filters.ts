import { TPaginationRequest } from "src/shared-module/models/pagination";

export type TPackageCategoriesFilters = TPaginationRequest & {
  name?: string;
};
