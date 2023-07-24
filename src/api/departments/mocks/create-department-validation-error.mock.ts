import { IApiError, ApiErrorTypeEnum } from "src/models";

export const createDepartmentValidationErrorMock: IApiError = {
  type: ApiErrorTypeEnum.createDepartmentValidationError,
  message: null,
  errors: {
    FullAddress: ["full address error"],
  },
};
