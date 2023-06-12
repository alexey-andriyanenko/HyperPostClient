export interface IUserLoginViaEmailRequest {
  email: string;
  password: string;
}

export interface IUserLoginViaPhoneRequest {
  phone: string;
  password: string;
}

export interface IUserLoginResponse {
  id: number;
  accessToken: string;
}
