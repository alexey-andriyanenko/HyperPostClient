import { IApiError, ApiErrorTypeEnum } from "src/models";

export const createPackageCategoryValidationErrorMock: IApiError = {
  type: ApiErrorTypeEnum.createPackageCategoryValidationError,
  message: null,
  errors: {
    Name: ["name error"],
  },
};
