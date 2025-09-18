import { databaseConfig } from "../common/config/database";
import { Team } from "../models/teamModel";
import { User } from "../models/userModel";
import { AppError } from "../utils/appError";

const teamRepo = databaseConfig.getRepository(Team);
const userRepo = databaseConfig.getRepository(User);

export class TeamRepository {
  async getTeamData(userId: string) {
    // get user through userId
    const user = await userRepo.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new AppError({
        message: "User not found",
        statusCode: 404,
        isOperational: false,
        type: "fail",
      });
    }
    const teamData = await teamRepo.find({
      relations: {
        teamMemberships: {
          user: true,
          role: true,
        },
      },
      where: {
        teamMemberships: {
          user: {
            id: user.id,
          },
        },
      },
    });
    if (!user) {
      throw new AppError({
        message: "Team not found",
        statusCode: 404,
        isOperational: false,
        type: "fail",
      });
    }
    return teamData;
  }
}
