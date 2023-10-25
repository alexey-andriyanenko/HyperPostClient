import { IDepartment, TDepartmentsFilters, TPaginationResponse } from "src/models";

import { ICreateDepartmentRequest, IEditDepartmentRequest } from "./department.api.types";
import { httpClient } from "../http-client";

class DepartmentsApiService {
  loadDepartments(filters: TDepartmentsFilters) {
    return httpClient
      .get<TPaginationResponse<IDepartment>>("/departments")
      .setSearchParams(filters)
      .send();
  }

  createDepartment(department: ICreateDepartmentRequest) {
    return httpClient.post<ICreateDepartmentRequest, IDepartment>("/departments").send(department);
  }

  editDepartment(id: number, payload: IEditDepartmentRequest) {
    return httpClient
      .put<IEditDepartmentRequest, IDepartment>("/departments/:id")
      .setRouteParams({ id })
      .send(payload);
  }

  deleteDepartment(id: number) {
    return httpClient.delete<void>("/departments/:id").setRouteParams({ id }).send();
  }
}

export const departmentsApiService = new DepartmentsApiService();
