import { TeamService } from '../services/team_services';
import {
  Controller,
  Get,
  Path,
  Route,
  Response,
  SuccessResponse,
} from 'tsoa';
import { GetTaskError } from '../dtos/error.dto';

@Route('/task')
export class TeamController extends Controller {
  private teamService = new TeamService();

  constructor() {
    super();
    this.teamService = this.teamService;
  }

  @Response<GetTaskError>('default', 'you are not in a team')
  @SuccessResponse(200, 'fetch task successful')
  @Get('{userId}')
  public async getTask(@Path() userId: string) {
    const teamData = await this.teamService.getTeamData(userId);
    this.setStatus(200);
    return teamData;
  }
}
