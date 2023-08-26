import { IPackageCategory, TPaginationResponse } from "src/models";

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
