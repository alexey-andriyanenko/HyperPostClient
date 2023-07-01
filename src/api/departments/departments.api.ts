import { IDepartment, TPaginationRequest, TPaginationResponse } from "src/models";
import { httpClient } from "../http-client";

class DepartmentsApiService {
  loadDepartments(pagination: TPaginationRequest) {
    return httpClient
      .get<TPaginationResponse<IDepartment>>("/departments")
      .setSearchParams(pagination)
      .send();
  }
}

export const departmentsApiService = new DepartmentsApiService();
