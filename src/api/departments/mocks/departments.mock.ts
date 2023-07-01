import { IDepartment, TPaginationResponse } from "src/models";

export const departmentsMock: TPaginationResponse<IDepartment> = {
  list: [
    {
      id: 1,
      number: 1,
      fullAddress: "Full Address",
    },
  ],
  totalPages: 1,
  totalCount: 1,
};
