import { makeAutoObservable, runInAction } from "mobx";
import { IDepartment, TDepartmentsFilters } from "src/departments-module/models";

import {
  departmentsApiService,
  ICreateDepartmentRequest,
  IEditDepartmentRequest,
} from "src/departments-module/api";

import { eventBus } from "src/event-bus";

class DepartmentsStore {
  private _departments: IDepartment[] = [];
  private _totalPages = 0;
  private _totalCount = 0;
  private _isLoading = false;
  private _filters: TDepartmentsFilters = {
    page: 1,
    limit: 10,
  };

  constructor() {
    makeAutoObservable(this);
    eventBus.on("logout", this._clear.bind(this));
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

  public async loadDepartments(filters: TDepartmentsFilters) {
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

  public async deleteDepartment(id: number) {
    await departmentsApiService.deleteDepartment(id);
    await this.loadDepartments(this._filters);
  }

  private _clear() {
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

export const departmentsStore = new DepartmentsStore();
