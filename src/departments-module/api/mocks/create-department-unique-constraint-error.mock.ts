import { ApiErrorTypeEnum, IApiError } from "src/shared-module/models";

export const departmentUniqueConstraintErrorMock: IApiError = {
  type: ApiErrorTypeEnum.departmentUniqueConstraintError,
  message: "department-unique-constraint-error",
  errors: null,
};
