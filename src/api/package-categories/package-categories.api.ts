import { httpClient } from "../http-client";
import { TPaginationResponse, IPackageCategory, TPaginationRequest } from "src/models";
import { ICreatePackageCategoryRequest } from "./package-categories.api.types";

export class PackageCategoriesApiService {
  loadPackageCategories(filters: TPaginationRequest) {
    return httpClient
      .get<TPaginationResponse<IPackageCategory>>("/package/categories")
      .setSearchParams(filters)
      .send();
  }

  createPackageCategory(data: ICreatePackageCategoryRequest) {
    return httpClient
      .post<ICreatePackageCategoryRequest, IPackageCategory>("/package/categories")
      .send(data);
  }
}

export const packageCategoriesApiService = new PackageCategoriesApiService();
