import { IPackage, TPaginationResponse } from "src/models";
import { packageModelMock } from "src/models/mocks";

export const packagesMock: TPaginationResponse<IPackage> = {
  list: [packageModelMock],
  totalPages: 1,
  totalCount: 1,
};
