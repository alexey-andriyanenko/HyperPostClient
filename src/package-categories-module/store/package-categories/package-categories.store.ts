import { makeAutoObservable, runInAction } from "mobx";

import { eventBus } from "src/event-bus";

import { TPackageCategoriesFilters } from "src/package-categories-module/models";
import { IPackageCategory } from "src/package-categories-module/models";
import {
  ICreatePackageCategoryRequest,
  packageCategoriesApiService,
} from "src/package-categories-module/api/package-categories";

class PackageCategoriesStore {
  private _packageCategories: IPackageCategory[] = [];
  private _totalPages = 0;
  private _totalCount = 0;
  private _isLoading = false;
  private _filters: TPackageCategoriesFilters = {
    page: 1,
    limit: 10,
  };

  constructor() {
    makeAutoObservable(this);
    eventBus.on("logout", this._clear.bind(this));
  }

  public get packageCategories() {
    return this._packageCategories;
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

  public async loadPackageCategories(filters: TPackageCategoriesFilters) {
    this._isLoading = true;
    this._filters = filters;

    try {
      const result = await packageCategoriesApiService.loadPackageCategories(filters);

      runInAction(() => {
        this._packageCategories = result.list;
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

  public async createPackageCategory(data: ICreatePackageCategoryRequest) {
    await packageCategoriesApiService.createPackageCategory(data);
    await this.loadPackageCategories(this._filters);
  }

  public async editPackageCategory(id: number, data: ICreatePackageCategoryRequest) {
    const pc = await packageCategoriesApiService.editPackageCategory(id, data);

    runInAction(() => {
      const index = this._packageCategories.findIndex((x) => x.id === pc.id);
      this._packageCategories[index] = pc;
    });
  }

  public async deletePackageCategory(id: number) {
    await packageCategoriesApiService.deletePackageCategory(id);
    await this.loadPackageCategories(this._filters);
  }

  private _clear() {
    this._packageCategories = [];
    this._totalPages = 0;
    this._totalCount = 0;
    this._isLoading = false;
    this._filters = {
      page: 1,
      limit: 10,
    };
  }
}

export const packageCategoriesStore = new PackageCategoriesStore();
