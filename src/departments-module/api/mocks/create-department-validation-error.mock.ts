import { IApiError, ApiErrorTypeEnum } from "src/shared-module/models";

export const departmentValidationErrorMock: IApiError = {
  type: ApiErrorTypeEnum.departmentValidationError,
  message: null,
  errors: {
    FullAddress: ["full address error"],
  },
};
