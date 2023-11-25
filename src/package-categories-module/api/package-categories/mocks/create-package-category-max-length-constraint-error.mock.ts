import { ApiErrorTypeEnum, IApiError } from "src/shared-module/models";

export const packageCategoryMaxLengthConstraintErrorMock: IApiError = {
  type: ApiErrorTypeEnum.packageCategoryMaxLengthConstraintError,
  message: "package-category-max-length-constraint-error",
  errors: null,
};
