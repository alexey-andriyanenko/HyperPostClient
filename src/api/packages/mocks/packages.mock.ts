import { IPackage, TPaginationResponse } from "src/models";
import { packageMock } from "src/models/mocks";

export const packagesMock: TPaginationResponse<IPackage> = {
  list: [packageMock],
  totalPages: 1,
  totalCount: 1,
};
