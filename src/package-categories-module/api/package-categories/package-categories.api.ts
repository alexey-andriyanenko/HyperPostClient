import { httpClient } from "src/shared-module/api/http-client";
import { TPaginationResponse } from "src/shared-module/models";

import { IPackageCategory, TPackageCategoriesFilters } from "src/package-categories-module/models";

import {
  ICreatePackageCategoryRequest,
  IEditPackageCategoryRequest,
} from "./package-categories.api.types";

export class PackageCategoriesApiService {
  loadPackageCategories(filters: TPackageCategoriesFilters) {
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

  editPackageCategory(id: number, data: IEditPackageCategoryRequest) {
    return httpClient
      .put<IEditPackageCategoryRequest, IPackageCategory>("/package/categories/:id")
      .setRouteParams({ id })
      .send(data);
  }

  deletePackageCategory(id: number) {
    return httpClient.delete<void>("/package/categories/:id").setRouteParams({ id }).send();
  }
}

export const packageCategoriesApiService = new PackageCategoriesApiService();
