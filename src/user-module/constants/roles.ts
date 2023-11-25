import { RolesEnum } from "../models";

export const ROLES_NAMES: Record<RolesEnum, string> = {
  [RolesEnum.Admin]: "Admin",
  [RolesEnum.Manager]: "Manager",
  [RolesEnum.Client]: "Client",
};
