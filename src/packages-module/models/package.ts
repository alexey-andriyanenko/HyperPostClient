import { IPackageCategory } from "src/package-categories-module/models";
import { IUser } from "src/user-module/models/user";
import { IDepartment } from "src/departments-module/models/departments";

export interface IPackage {
  id: string;
  statusId: number;
  category: IPackageCategory;
  senderUser: IUser;
  receiverUser: IUser;
  senderDepartment: IDepartment;
  receiverDepartment: IDepartment;
  createdAt: string;
  modifiedAt: string | null;
  sentAt: string | null;
  arrivedAt: string | null;
  receivedAt: string | null;
  archivedAt: string | null;
  packagePrice: number;
  deliveryPrice: number;
  weight: number;
  description: string | null;
}
