import { TeamRepository } from '../repositories/team_repository';

export class TeamService {
  private teamRepo = new TeamRepository();

  constructor() {
    this.teamRepo = this.teamRepo;
  }

  async getTeamData(userId: string) {
    const teamData = await this.teamRepo.getTeamData(userId);
    if (!teamData) {
      throw new Error('team not found');
    }
    return teamData;
  }
}
