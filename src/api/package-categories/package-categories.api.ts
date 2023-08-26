import { httpClient } from "../http-client";
import { TPaginationResponse, IPackageCategory, TPaginationRequest } from "src/models";

export class PackageCategoriesApiService {
  loadPackageCategories(filters: TPaginationRequest) {
    return httpClient
      .get<TPaginationResponse<IPackageCategory>>("/package/categories")
      .setSearchParams(filters)
      .send();
  }
}

export const packageCategoriesApiService = new PackageCategoriesApiService();
