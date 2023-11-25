import { TPaginationResponse } from "src/shared-module/models";
import { IDepartment } from "../../models";

export const departmentsMock: TPaginationResponse<IDepartment> = {
  list: [
    {
      id: 1,
      number: 1,
      fullAddress: "department-1-address",
    },
    {
      id: 2,
      number: 2,
      fullAddress: "department-2-address",
    },
  ],
  totalPages: 1,
  totalCount: 1,
};
