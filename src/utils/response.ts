import { Response } from "express";
import { ApiResponseUpdateUser } from "../dtos/user.dto";

// define meta to be an object with type of any or null
type Meta = Record<string, any> | null;

// define the structure of that passes into the constructor. <T> means it is a flexible data structure
interface ResponseHandlerOptions<T = unknown> {
  data: T;
  message: string;
  statusCode?: any;
  meta?: Meta;
  status?: "success" | "fail" | "error";
}

// define class that is reusable with any data
export class ResponseHandler<T = unknown> implements ApiResponseUpdateUser{
  public readonly data: any;
  public readonly message: string;
  public readonly statusCode: number;
  public readonly meta: Meta;
  public readonly status: any;

  constructor({
    data,
    message,
    statusCode,
    meta = null,
    status = "success",
  }: ResponseHandlerOptions<T>) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode ;
    this.meta = meta;
    this.status = status;
  }

  public send(res: Response): void {
    const responseBody = {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      status: this.status,
      ...(this.meta && { meta: this.meta }),
    };

    res.status(this.statusCode).json(responseBody);
  }
}
