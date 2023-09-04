import { ApiErrorTypeEnum, IApiError } from "src/models";

export const createPackageCategoryUniqueConstraintErrorMock: IApiError = {
  type: ApiErrorTypeEnum.createPackageCategoryUniqueConstraintError,
  message: "create-package-category-unique-constraint-error",
  errors: null,
};
