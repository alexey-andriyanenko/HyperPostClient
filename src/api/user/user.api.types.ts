export interface IUserLoginViaEmailRequest {
  email: string;
  password: string;
}

export interface IUserLoginViaPhoneRequest {
  phoneNumber: string;
  password: string;
}

export interface IUserLoginResponse {
  id: number;
  accessToken: string;
}

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
