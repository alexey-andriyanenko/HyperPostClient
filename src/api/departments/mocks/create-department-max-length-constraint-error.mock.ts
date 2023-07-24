import { ApiErrorTypeEnum, IApiError } from "src/models";

export const createDepartmentMaxLengthConstraintErrorMock: IApiError = {
  type: ApiErrorTypeEnum.createDepartmentMaxLengthConstraintError,
  message: "create-department-max-length-constraint-error",
  errors: null,
};
