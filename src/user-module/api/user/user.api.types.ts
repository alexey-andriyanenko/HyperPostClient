export interface IUserUpdateRequest {
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
}

export interface IUpdateMeRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export type TCheckIfUserExistsRequest = {
  email?: string;
  phone?: string;
};
