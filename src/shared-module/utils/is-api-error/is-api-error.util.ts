import { IApiError } from "src/shared-module/models";

export const isApiError = (error: any): error is IApiError => {
  return (
    Object.hasOwn(error, "type") &&
    Object.hasOwn(error, "message") &&
    Object.hasOwn(error, "errors")
  );
};
