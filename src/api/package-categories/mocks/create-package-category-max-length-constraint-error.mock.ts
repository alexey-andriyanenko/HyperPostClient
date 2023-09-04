import { ApiErrorTypeEnum, IApiError } from "src/models";

export const createPackageCategoryMaxLengthConstraintErrorMock: IApiError = {
  type: ApiErrorTypeEnum.createPackageCategoryMaxLengthConstraintError,
  message: "create-package-category-max-length-constraint-error",
  errors: null,
};
