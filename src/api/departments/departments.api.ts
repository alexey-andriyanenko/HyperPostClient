import { IDepartment, TPaginationRequest, TPaginationResponse } from "src/models";
import { httpClient } from "../http-client";
import { ICreateDepartmentRequest, IEditDepartmentRequest } from "./department.api.types";

class DepartmentsApiService {
  loadDepartments(pagination: TPaginationRequest) {
    return httpClient
      .get<TPaginationResponse<IDepartment>>("/departments")
      .setSearchParams(pagination)
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
