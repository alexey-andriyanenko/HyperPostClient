import { makeAutoObservable, runInAction } from "mobx";
import { IDepartment, TPaginationRequest } from "src/models";

import { IStore } from "../store.interface";

import {
  departmentsApiService,
  ICreateDepartmentRequest,
  IEditDepartmentRequest,
} from "src/api/departments";

export class DepartmentsStore implements IStore {
  private _departments: IDepartment[] = [];
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

  public get departments() {
    return this._departments;
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

  public async loadDepartments(filters: TPaginationRequest) {
    runInAction(() => {
      this._isLoading = true;
      this._filters = filters;
    });

    try {
      const result = await departmentsApiService.loadDepartments(filters);

      runInAction(() => {
        this._departments = result.list;
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

  public async createDepartment(department: ICreateDepartmentRequest) {
    await departmentsApiService.createDepartment(department);
    await this.loadDepartments(this._filters);
  }

  public async editDepartment(id: number, payload: IEditDepartmentRequest) {
    const dep = await departmentsApiService.editDepartment(id, payload);

    runInAction(() => {
      const index = this._departments.findIndex((d) => d.id === dep.id);
      this._departments[index] = dep;
    });
  }

  public logout() {
    this._departments = [];
    this._totalPages = 0;
    this._totalCount = 0;
    this._isLoading = false;
    this._filters = {
      page: 1,
      limit: 10,
    };
  }
}
