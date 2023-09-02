import { makeAutoObservable, runInAction } from "mobx";
import { IPackageCategory, TPaginationRequest } from "src/models";
import {
  ICreatePackageCategoryRequest,
  packageCategoriesApiService,
} from "src/api/package-categories";
import { IStore } from "../store.interface";

export class PackageCategoriesStore implements IStore {
  private _packageCategories: IPackageCategory[] = [];
  private _totalPages = 0;
  private _totalCount = 0;
  private _isLoading = false;
  private _filters: TPaginationRequest = {
    page: 1,
    limit: 10,
  };

  constructor() {
    makeAutoObservable(this);
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

  public async loadPackageCategories(filters: TPaginationRequest) {
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

  public logout() {
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
