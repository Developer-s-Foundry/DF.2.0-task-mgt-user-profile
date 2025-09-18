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
  Post,
} from 'tsoa';
import { User } from '../models/userModel';
import { updateProfileDto } from '../dtos/user.dto';
import { GetUserError } from '../dtos/error.dto';
import APP_CONFIGS from '../common/config';
import Mailjet from 'node-mailjet';
import crypto from 'node:crypto'

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


  @Post('/generate-reset-password-token')
  public async generatePasswordReset (
    @Body() email: string
  ) {
    // verify user email
    const userExist = await this.userService.verifyUserEmail(email)
    if (!userExist) {
      return {
        message: 'user does not exist',
        successful: false
      }
    }
    try {
      // generate token
      const randomToken = Math.floor((Math.random() * 4582)).toString()
      // generate hash
      const secret = APP_CONFIGS.PASSWORD_HASH_SECRET
      const hash = crypto.createHmac('sha256', secret)
                    .update(randomToken)
                    .digest('hex');
      // save hash and expiry to database
      await this.userService.updateUser(userExist.id, {
        reset_token_hash: hash,
        reset_token_expiry: new Date(Date.now() + 3600000)
      })
      const mailJett = Mailjet.apiConnect(
          APP_CONFIGS.MAILJETAPIPUBLICKEY, 
          APP_CONFIGS.MAILJETAPIPRIVATEKEY)
      const message =  {
                    "From": {
                        "Email": "user-profile-team@outlook.com",
                        "Name": "user_profile_team"
                    },
                    "To": [
                        {
                            "Email": email,
                            "Name": `${userExist.first_name} ${userExist.last_name}`
                        }
                    ],
                    "Subject": "password Reset",
                    "HTMLPart": `<h3>reset your pasword using your One Time-access Token (OTP)</h3> \
                                <br /> <p>${randomToken}</p>`
                   }
      const requestResult = await mailJett.post('send', {'version': 'v3.1'})
                        .request({
                          "Messages":[
                            message
                          ]
                        })
              console.log(requestResult.body)
    } catch (err) {
      console.log(err)
    }        
      
  }

  @Post('/verify-reset-password-token')
  async verifyPasswordToken(
    @Body() requestdto: {
      email: string, token: string} 
  ) {

    const {email, token} = requestdto
    const user = await this.userService.verifyUserEmail(email)
    if (!user) {
      return {
        message: 'user does not exist',
        successful: false
      }
    }
      return await this.userService.verifyResetToken(user.id, token)
  }

  @Post('/reset-password')
  async resetPassword (
    @Body() requestdto: {
      email: string,
      password: string
    }) {
      const {email, password} = requestdto
    const user = await this.userService.verifyUserEmail(email)
    if (!user) {
      return {
        message: 'user does not exist',
        successful: false
      }
    }
    await this.userService.updateUser(user.id, {password:password})

    return {
      message: 'password reset successful',
      successful: true
    }
  }
}
