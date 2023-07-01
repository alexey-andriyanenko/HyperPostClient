import { createUserHandlers } from "src/api/user/mocks";
import { createDepartmentsHandlers } from "src/api/departments/mocks";

export const createHandlers = () => {
  // TODO: move this to env files once deployment has to be done
  const baseurl = "http://localhost:8000";
  return [...createUserHandlers(baseurl), ...createDepartmentsHandlers(baseurl)];
};
