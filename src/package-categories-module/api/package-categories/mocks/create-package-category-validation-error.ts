import { IApiError, ApiErrorTypeEnum } from "src/shared-module/models";

export const packageCategoryValidationErrorMock: IApiError = {
  type: ApiErrorTypeEnum.packageCategoryValidationError,
  message: null,
  errors: {
    Name: ["name error"],
  },
};
