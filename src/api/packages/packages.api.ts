import { httpClient } from "../http-client";
import { TPaginationRequest, TPaginationResponse, IPackage } from "src/models";

class PackagesApiService {
  loadPackages(pagination: TPaginationRequest) {
    return httpClient
      .get<TPaginationResponse<IPackage>>("/packages")
      .setSearchParams(pagination)
      .send();
  }
}

export const packagesApiService = new PackagesApiService();
