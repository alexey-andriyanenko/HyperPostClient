export enum RolesEnum {
  Admin = 1,
  Manager,
  Client,
}

export interface IRole {
  id: number;
  name: string;
}
