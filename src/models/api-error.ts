export interface IApiError {
  type: ApiErrorTypeEnum;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export enum ApiErrorTypeEnum {
  createDepartmentValidationError = "create-department-validation-error",
  createDepartmentUniqueConstraintError = "create-department-unique-constraint-error",
  createDepartmentMaxLengthConstraintError = "create-department-max-length-constraint-error",
}
