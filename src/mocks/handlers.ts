import { createUserHandlers } from "src/api/user/mocks";
import { createDepartmentsHandlers } from "src/api/departments/mocks";
import { createPackageCategoriesMock } from "src/api/package-categories/mocks";
import { apiUrl } from "src/constants/api";

export const createHandlers = () => {
  // TODO: move this to env files once deployment has to be done
  return [
    ...createUserHandlers(apiUrl),
    ...createDepartmentsHandlers(apiUrl),
    ...createPackageCategoriesMock(apiUrl),
  ];
};
