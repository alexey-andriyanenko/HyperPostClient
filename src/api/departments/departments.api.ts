import { IDepartment, TPaginationRequest, TPaginationResponse } from "src/models";
import { httpClient } from "../http-client";
import { ICreateDepartmentRequest } from "./department.api.types";

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
}

export const departmentsApiService = new DepartmentsApiService();
