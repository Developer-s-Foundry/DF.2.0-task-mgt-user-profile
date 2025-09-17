// import the database cursor
import { databaseConfig } from "../common/config/database";
import { User } from "../models/userModel";
import { updateProfileDto } from "../dtos/user.dto";
import { AppError } from "../utils/appError";

const userRepo = databaseConfig.getRepository(User);

export class UserRepository {
  // update profile of user
  async updateProfile(id: string, data: updateProfileDto) {
    try {
      const user = await userRepo.findOneBy({ id: id });
      console.log(user)
      if (!user) {
        throw new AppError({
          message: "User not found",
          statusCode: 404,
          isOperational: false,
        });
      }

      // Merge data into user object
      userRepo.merge(user, data);
      const updatedUser = await userRepo.save(user);
      return updatedUser;
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

  async getUserById(id: string): Promise<User | null> {
    const user = await userRepo.findOne({ where: { id } });
    try {
      if (!user) {
        throw new AppError({
          message: "User not found",
          statusCode: 404,
          isOperational: false,
        });
      }
      return user;
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
