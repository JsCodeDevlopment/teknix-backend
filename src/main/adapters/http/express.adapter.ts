import { Request, Response } from 'express';
import { HttpRequest, HttpResponse } from './interfaces/http.interface';

export class ExpressAdapter {
  public static adaptRequest(req: Request): HttpRequest {
    return {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };
  }

  public static adaptResponse(res: Response, httpResponse: HttpResponse): void {
    res.status(httpResponse.status).json(httpResponse.body).send();
  }
}