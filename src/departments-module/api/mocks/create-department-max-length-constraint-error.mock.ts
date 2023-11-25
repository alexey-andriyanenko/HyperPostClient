import { ApiErrorTypeEnum, IApiError } from "src/shared-module/models";

export const departmentMaxLengthConstraintErrorMock: IApiError = {
  type: ApiErrorTypeEnum.departmentMaxLengthConstraintError,
  message: "department-max-length-constraint-error",
  errors: null,
};
