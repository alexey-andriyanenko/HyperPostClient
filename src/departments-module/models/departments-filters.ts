import { TPaginationRequest } from "src/shared-module/models";

export type TDepartmentsFilters = TPaginationRequest & {
  address?: string;
};
