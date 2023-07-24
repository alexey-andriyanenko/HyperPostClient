import { ApiErrorTypeEnum, IApiError } from "src/models";

export const createDepartmentUniqueConstraintErrorMock: IApiError = {
  type: ApiErrorTypeEnum.createDepartmentUniqueConstraintError,
  message: "create-department-unique-constraint-error",
  errors: null,
};
