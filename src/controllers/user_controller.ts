import { UserService } from "../services/user_services";
import {
  Body,
  Controller,
  Get,
  Path,
  Patch,
  Route,
  Response,
  SuccessResponse,
  Post,
} from 'tsoa';
import { updateProfileDto } from '../dtos/user.dto';
import { GetUserError, ChangePasswordError } from '../dtos/error.dto';
import APP_CONFIGS from '../common/config';
import Mailjet from 'node-mailjet';
import crypto from 'node:crypto'


import { ResponseHandler } from "../utils/response";
import { ApiResponseUpdateUser, changePasswordDto } from "../dtos/user.dto";

@Route("/user")
export class UserController extends Controller {
  private userService = new UserService();

  constructor() {
    super();
    this.userService = this.userService;
  }

  @Patch("{userId}")
  public async updateProfile(
    @Path() userId: string,
    @Body() profileData: updateProfileDto
  ): Promise<ApiResponseUpdateUser> {
    const data = await this.userService.updateProfile(userId, profileData);
    const response = new ResponseHandler({
      data: data,
      message: "User profile successfully updated",
      statusCode: this.setStatus(200),
      status: "success",
    });
    // this.setStatus(200);
    return response;
  }

  @Response<GetUserError>("default", "user not found")
  @SuccessResponse(200, "fetch user succesful")
  @Get("{userId}")
  public async getUser(@Path() userId: string) {
    const user = await this.userService.getUserProfile(userId);
    const response = new ResponseHandler({
      data: user,
      message: "User profile successfully fetched",
      statusCode: this.setStatus(200),
      status: "success",
    });

    return response;
  }}
