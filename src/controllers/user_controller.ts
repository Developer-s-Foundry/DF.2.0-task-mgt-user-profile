import { UserService } from '../services/user_services';
import {
  Body,
  Controller,
  Get,
  Path,
  Patch,
  Route,
  Response,
  SuccessResponse,
} from 'tsoa';
import { User } from '../models/userModel';
import { updateProfileDto } from '../dtos/user.dto';
import { GetUserError } from '../dtos/error.dto';

@Route('/user')
export class UserController extends Controller {
  private userService = new UserService();

  constructor() {
    super();
    this.userService = this.userService;
  }

  @Patch('{userId}')
  public async updateProfile(
    @Path() userId: string,
    @Body() profileData: updateProfileDto
  ): Promise<User> {
    return this.userService.updateProfile(userId, profileData);
  }

  @Response<GetUserError>('default', 'user not found')
  @SuccessResponse(200, 'fetch user successful')
  @Get('{userId}')
  public async getUser(@Path() userId: string) {
    const user = await this.userService.getUserProfile(userId);
    this.setStatus(200);
    return user;
  }
}
