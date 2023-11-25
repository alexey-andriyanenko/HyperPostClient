import { createUserHandlers } from "src/user-module/api/user/mocks";
import { createDepartmentsHandlers } from "src/departments-module/api/mocks";
import { createPackageCategoriesMock } from "src/package-categories-module/api/package-categories/mocks";
import { createPackagesHandlers } from "src/packages-module/api/packages/mocks";
import { apiUrl } from "src/shared-module/constants";

export const createHandlers = () => {
  return [
    ...createUserHandlers(apiUrl),
    ...createDepartmentsHandlers(apiUrl),
    ...createPackageCategoriesMock(apiUrl),
    ...createPackagesHandlers(apiUrl),
  ];
};
