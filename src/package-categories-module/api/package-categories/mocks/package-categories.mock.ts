import { TPaginationResponse } from "src/shared-module/models";
import { IPackageCategory } from "src/package-categories-module/models";

export const packageCategoriesMock: TPaginationResponse<IPackageCategory> = {
  list: [
    {
      id: 1,
      name: "package-category-name",
    },
  ],
  totalPages: 1,
  totalCount: 1,
};
