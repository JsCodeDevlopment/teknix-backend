import { StatusCode } from "./statusCode.enum";

export interface HttpRequest {
  body: any;
  params: any;
  query: any;
  headers: any;
}

export interface HttpResponse {
  status: StatusCode;
  body: any;
}