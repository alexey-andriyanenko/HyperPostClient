import { TPaginationResponse } from "src/shared-module/models";
import { httpClient } from "src/shared-module/api/http-client";

import { ICreateDepartmentRequest, IEditDepartmentRequest } from "./department.api.types";
import { IDepartment, TDepartmentsFilters } from "../models";

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
