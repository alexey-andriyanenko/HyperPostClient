export class HttpMessage<Path extends string, Method extends "get" | "post" | "put" | "delete"> {
  private _request: XMLHttpRequest = new XMLHttpRequest();

  private constructor(
    private _url: Path,

    private _method: Method,
  ) {}

  public static create<Path extends string, Method extends "get" | "post" | "put" | "delete">(
    url: Path,
    method: Method,
  ): Omit<HttpMessage<Path, Method>, "setHeaders"> {
    return new HttpMessage(url, method);
  }

  public setHeaders(headers: Record<string, string>): Omit<this, "setHeaders"> {
    for (const key in headers) {
      this._request.setRequestHeader(key, headers[key]);
    }

    return this;
  }

  public setSearchParams(qp: Record<string, string>): Omit<this, "setSearchParams"> {
    const params = new URLSearchParams(qp);
    return this;
  }
}

const message = HttpMessage.create("http://localhost:3000", "get");
