import { RolesEnum } from "src/models";

export interface IProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  roleId: RolesEnum;
}
