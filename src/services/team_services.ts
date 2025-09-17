import { TeamRepository } from "../repositories/team_repository";


export class TeamService {
    private teamRepo = new TeamRepository()

    constructor() {
        this.teamRepo = this.teamRepo
    }

    async getTeamData(userId: string) {
        return await this.teamRepo.getTeamData(userId)
    }
}