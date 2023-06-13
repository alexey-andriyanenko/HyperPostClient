import { ExtractParams } from "./http-message.types";
import { HttpClient } from "./http-client";

export class HttpMessage<
  RequestBody,
  ResponseBody,
  Method extends "get" | "post" | "put" | "delete",
  Path extends string = string,
> {
  private _request: XMLHttpRequest = new XMLHttpRequest();

  private constructor(private _url: string, private _method: Method) {}

  public static create<
    Request,
    Response,
    Method extends "get" | "post" | "put" | "delete",
    Path extends string = string,
  >(url: Path, method: Method): HttpMessage<Request, Response, Method, Path> {
    return new HttpMessage<Request, Response, Method, Path>(url, method);
  }

  public setHeaders(headers: Record<string, string>): Omit<this, "setHeaders"> {
    for (const key in headers) {
      this._request.setRequestHeader(key, headers[key]);
    }

    return this;
  }

  public setSearchParams(qp: Record<string, string>): Omit<this, "setSearchParams"> {
    const params = new URLSearchParams(qp);
    this._url += `?${params.toString()}`;

    return this;
  }

  public setRouteParams(params: ExtractParams<Path>): Omit<this, "setRouteParams"> {
    const paramKeys = Object.keys(params);

    for (const key of paramKeys) {
      // @ts-ignore
      this._url = this._url.replace(`:${key}`, params[key]);
    }

    return this;
  }

  public send<T extends Method>(
    body?: Method extends "get" | "delete" ? never : RequestBody,
  ): Promise<ResponseBody> {
    return new Promise((resolve, reject) => {
      this._request.open(this._method, this._url);

      this._request.setRequestHeader("Content-Type", "application/json");

      if (HttpClient.token)
        this._request.setRequestHeader("Authorization", `Bearer ${HttpClient.token}`);

      this._request.onload = () => {
        if (this._request.status >= 200 && this._request.status < 300) {
          resolve(JSON.parse(this._request.responseText));
        } else {
          reject(JSON.parse(this._request.responseText));
        }
      };

      this._request.onerror = () => {
        reject(JSON.parse(this._request.responseText));
      };

      this._request.send(JSON.stringify(body));
    });
  }
}
