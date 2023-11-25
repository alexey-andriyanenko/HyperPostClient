export interface IApiError {
  type: ApiErrorTypeEnum;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export enum ApiErrorTypeEnum {
  departmentValidationError = "department-validation-error",
  departmentUniqueConstraintError = "department-unique-constraint-error",
  departmentMaxLengthConstraintError = "department-max-length-constraint-error",
  packageCategoryValidationError = "package-category-validation-error",
  packageCategoryUniqueConstraintError = "package-category-unique-constraint-error",
  packageCategoryMaxLengthConstraintError = "package-category-max-length-constraint-error",
}
