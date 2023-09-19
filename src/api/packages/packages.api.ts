import { httpClient } from "../http-client";
import { TPaginationRequest, TPaginationResponse, IPackage } from "src/models";
import { packagesMock } from "./mocks";

class PackagesApiService {
  loadPackages(pagination: TPaginationRequest): Promise<TPaginationResponse<IPackage>> {
    return new Promise((res) => setTimeout(() => res(packagesMock), 50));
    // TODO: uncomment when backend data will be available
    // return httpClient
    //   .get<TPaginationResponse<IPackage>>("/packages")
    //   .setSearchParams(pagination)
    //   .send();
  }
}

export const packagesApiService = new PackagesApiService();
