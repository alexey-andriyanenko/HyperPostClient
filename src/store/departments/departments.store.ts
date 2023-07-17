import { makeAutoObservable, runInAction } from "mobx";
import { IDepartment } from "src/models";

import { IStore } from "../store.interface";
import { departmentsApiService } from "src/api/departments";
import { ICreateDepartmentRequest } from "../../api/departments/department.api.types";

export class DepartmentsStore implements IStore {
  private _departments: IDepartment[] = [];
  private _totalPages = 0;
  private _totalCount = 0;
  private _isLoading = false;

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

  public async loadDepartments() {
    runInAction(() => {
      this._isLoading = true;
    });

    try {
      const result = await departmentsApiService.loadDepartments({ page: 1, limit: 10 });

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
    await this.loadDepartments();
  }

  logout() {
    this._departments = [];
  }
}
