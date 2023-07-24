import { createUserHandlers } from "src/api/user/mocks";
import { createDepartmentsHandlers } from "src/api/departments/mocks";
import { apiUrl } from "../constants/api";

export const createHandlers = () => {
  // TODO: move this to env files once deployment has to be done
  return [...createUserHandlers(apiUrl), ...createDepartmentsHandlers(apiUrl)];
};
