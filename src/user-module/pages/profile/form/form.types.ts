import { RolesEnum } from "src/user-module/models";

export interface IProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  roleId: RolesEnum;
}
