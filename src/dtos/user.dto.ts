import { User } from "../models/userModel";
export interface updateProfileDto {
    first_name?: string;
    last_name?: string;
}

export interface ApiResponseUpdateUser {
  data: User;
  message: string;
  statusCode: number;
  status: "success" | "error";
}