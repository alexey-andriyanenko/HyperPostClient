import { ApiErrorTypeEnum, IApiError } from "src/models";

export const departmentMaxLengthConstraintErrorMock: IApiError = {
  type: ApiErrorTypeEnum.departmentMaxLengthConstraintError,
  message: "department-max-length-constraint-error",
  errors: null,
};
