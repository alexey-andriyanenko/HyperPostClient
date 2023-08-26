import { HttpClient } from "./http-client";

// TODO: this class should be located in some 'sharable' folder
export const httpClient = new HttpClient("http://localhost:8000");
export { HttpClient };
