import { IApiError, ApiErrorTypeEnum } from "src/models";

export const departmentValidationErrorMock: IApiError = {
  type: ApiErrorTypeEnum.departmentValidationError,
  message: null,
  errors: {
    FullAddress: ["full address error"],
  },
};
