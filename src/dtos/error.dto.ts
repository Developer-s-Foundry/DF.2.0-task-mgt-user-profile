export interface GetUserError {
  message: 'user not found';
  // details: { [name: string]: unknown };
}

export interface GetTaskError {
  message: 'Task not found';
}

export interface ChangePasswordError {
  message: string;
  statusCode: number;
  status: "fail" | "error";
}
