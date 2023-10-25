import { TPaginationRequest } from "./pagination";

export type TDepartmentsFilters = TPaginationRequest & {
  address?: string;
};
