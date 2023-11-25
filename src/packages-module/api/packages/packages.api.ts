import { httpClient } from "src/shared-module/api/http-client";
import { TPaginationRequest, TPaginationResponse } from "src/shared-module/models";

import { IPackage } from "src/packages-module/models";

import { ICreatePackageRequest } from "./packages.types";

class PackagesApiService {
  loadPackages(pagination: TPaginationRequest): Promise<TPaginationResponse<IPackage>> {
    return httpClient
      .get<TPaginationResponse<IPackage>>("/packages")
      .setSearchParams(pagination)
      .send();
  }

  createPackage(request: ICreatePackageRequest): Promise<IPackage> {
    return httpClient.post<ICreatePackageRequest, IPackage>("/packages").send(request);
  }
}

export const packagesApiService = new PackagesApiService();
