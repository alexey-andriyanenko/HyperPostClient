import { ApiErrorTypeEnum, IApiError } from "src/models";

export const departmentUniqueConstraintErrorMock: IApiError = {
  type: ApiErrorTypeEnum.departmentUniqueConstraintError,
  message: "department-unique-constraint-error",
  errors: null,
};
