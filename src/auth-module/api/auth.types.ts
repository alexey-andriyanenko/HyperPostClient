export interface ILoginViaEmailRequest {
  email: string;
  password: string;
}

export interface ILoginViaPhoneRequest {
  phoneNumber: string;
  password: string;
}

export interface ILoginResponse {
  id: number;
  accessToken: string;
}
