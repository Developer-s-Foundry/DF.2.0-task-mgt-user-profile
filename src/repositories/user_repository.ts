// import the database cursor
import { databaseConfig } from "../common/config/database";
import { User } from "../models/userModel";
import { updateProfileDto, changePasswordDto } from "../dtos/user.dto";
import { AppError } from "../utils/appError";
import bcrypt from "bcrypt";

const userRepo = databaseConfig.getRepository(User);

export class UserRepository {
  // update profile of user
  async updateProfile(id: string, data: updateProfileDto) {
    try {
      const user = await userRepo.findOneBy({ id: id });
      console.log(user);
      if (!user) {
        throw new AppError({
          message: "User not found",
          statusCode: 404,
          isOperational: false,
          type: "fail",
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
          type: "fail",
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

  async changePassword(id: string, data: changePasswordDto) {
    const user = await userRepo.findOne({
      where: { id },
      select: ["password"],
    });
    try {
      if (!user) {
        throw new AppError({
          message: "User not found",
          statusCode: 404,
          isOperational: false,
          type: "fail",
        });
      }

      const hashedPassword = user.password;
      const oldPassword = data.oldPassword;
      const newPassword = data.newPassword;
      const comparePassword = await bcrypt.compare(oldPassword, hashedPassword);
      if (!comparePassword) {
        throw new AppError({
          message: "Old password incorrect",
          statusCode: 403,
          isOperational: false,
          type: "forbidden",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      await userRepo.update(id, { password: hashedNewPassword });
      return;
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
