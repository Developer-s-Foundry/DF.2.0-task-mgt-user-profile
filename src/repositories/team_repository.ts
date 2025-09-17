import { databaseConfig } from "../common/config/database"
import { Team } from "../models/teamModel"
import { User } from "../models/userModel"


const teamRepo = databaseConfig.getRepository(Team)
const userRepo = databaseConfig.getRepository(User)

export class TeamRepository {

    async getTeamData(userId: string) {
        // get user through userId
        const user = await userRepo.findOneBy({
            id: userId
        })
        if (!user) {
            throw new Error('user does not exist')
        }
        const teamData = teamRepo.findOne({
            relations: {
                 teamMemberships: true
            },
            where: {
                teamMemberships : {
                    user: user
                }
            }
        })
        if (!teamData) {
             throw new Error('team data does not exist')
        }
        return teamData 
    }
}