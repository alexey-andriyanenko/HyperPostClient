import { IApiError, ApiErrorTypeEnum } from "src/models";

export const packageCategoryValidationErrorMock: IApiError = {
  type: ApiErrorTypeEnum.packageCategoryValidationError,
  message: null,
  errors: {
    Name: ["name error"],
  },
};
