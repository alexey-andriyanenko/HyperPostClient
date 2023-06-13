import { RolesEnum } from "./role";

export interface IUser {
  id: number;
  roleId: RolesEnum;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
