import { httpClient } from "../http-client";
import { TPaginationRequest, TPaginationResponse, IPackage } from "src/models";
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
