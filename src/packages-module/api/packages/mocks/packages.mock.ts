import { TPaginationResponse } from "src/shared-module/models";

import { IPackage } from "src/packages-module/models";
import { packageModelMock } from "src/packages-module/models/mocks";

export const packagesMock: TPaginationResponse<IPackage> = {
  list: [packageModelMock],
  totalPages: 1,
  totalCount: 1,
};
