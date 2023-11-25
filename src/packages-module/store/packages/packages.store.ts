import { makeAutoObservable, runInAction } from "mobx";

import { TPaginationRequest } from "src/shared-module/models";
import { eventBus } from "src/event-bus";

import { IPackage } from "src/packages-module/models";
import { ICreatePackageRequest, packagesApiService } from "src/packages-module/api/packages";

class PackagesStore {
  private _packages: IPackage[] = [];
  private _totalPages = 0;
  private _totalCount = 0;
  private _isLoading = false;
  private _filters: TPaginationRequest = {
    page: 1,
    limit: 10,
  };

  constructor() {
    makeAutoObservable(this);
    eventBus.on("logout", this._clear.bind(this));
  }

  public get packages() {
    return this._packages;
  }

  public get totalPages() {
    return this._totalPages;
  }

  public get totalCount() {
    return this._totalCount;
  }

  public get isLoading() {
    return this._isLoading;
  }

  public get filters() {
    return this._filters;
  }

  public async loadPackages(filters: TPaginationRequest) {
    this._isLoading = true;

    try {
      const result = await packagesApiService.loadPackages(filters);

      runInAction(() => {
        this._packages = result.list;
        this._totalPages = result.totalPages;
        this._totalCount = result.totalCount;
      });
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  public async createPackage(request: ICreatePackageRequest) {
    await packagesApiService.createPackage(request);
    await this.loadPackages(this._filters);
  }

  private _clear() {
    this._packages = [];
    this._totalPages = 0;
    this._totalCount = 0;
    this._isLoading = false;
    this._filters = {
      page: 1,
      limit: 10,
    };
  }
}

export const packagesStore = new PackagesStore();
