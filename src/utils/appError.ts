// extend ts Error into APpError class
export class AppError extends Error {
  // set properties 
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly status: string;

  constructor({
    message,
    statusCode,
    isOperational = true,
    type = "error",
  }: {
    message: string;
    statusCode: number;
    isOperational?: boolean;
    type?: string;
    }) {
    // calls Error message. ensures we can access Error.message
    super(message);
    // important if we want to check if err instanceOf AppError
    Object.setPrototypeOf(this, AppError.prototype);

    // assign values to the properties
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = type;

    // return stack trace of this error constructor only
    Error.captureStackTrace(this, this.constructor);
  }
}
