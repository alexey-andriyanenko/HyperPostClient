import { ApiErrorTypeEnum, IApiError } from "src/shared-module/models";

export const packageCategoryUniqueConstraintErrorMock: IApiError = {
  type: ApiErrorTypeEnum.packageCategoryUniqueConstraintError,
  message: "package-category-unique-constraint-error",
  errors: null,
};
