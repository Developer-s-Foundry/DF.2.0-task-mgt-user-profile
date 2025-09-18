// import the database cursor
import { databaseConfig } from "../common/config/database";
import { Task } from "../models/taskModel";
import { AppError } from "../utils/appError";

const taskRepo = databaseConfig.getRepository(Task);

export class TaskRepository {
  async getTaskById(id: string): Promise<Task | null> {
    try {
      const data = await taskRepo.findOne({
        where: { id },
        relations: ["user"],
      });
      if (!data) {
        throw new AppError({
          message: "Task not found",
          statusCode: 404,
          isOperational: false,
          type: "fail",
        });
      }
      return data;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error when fetching all plans:", error);
        throw new AppError({
          message: "Internal server error",
          statusCode: 500,
          isOperational: false,
          type: "error",
        });
      }
      throw error;
    }
  }

  async getTaskByUserId(userId: string): Promise<Task[] | null> {
    try {
      const data = await taskRepo.find({
        where: { user: { id: userId } },
        relations: ["user"],
      });
   
      if (!data) {
        throw new AppError({
          message: "User not found",
          statusCode: 404,
          isOperational: false,
          type: "fail",
        });
      }
      return data;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error when fetching all plans:", error);
        throw new AppError({
          message: "Internal server error",
          statusCode: 500,
          isOperational: false,
          type: "error",
        });
      }
      throw error;
    }
  }
}
