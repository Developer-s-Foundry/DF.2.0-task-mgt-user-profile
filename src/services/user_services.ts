import { UserRepository } from '../repositories/user_repository';
import { updateDto, updateProfileDto } from '../dtos/user.dto';


export class UserService {
  private userRepository = new UserRepository();

  constructor() {
    this.userRepository = new UserRepository();
  }

  async updateProfile(id: string, data: updateProfileDto) {
    return await this.userRepository.updateProfile(id, data);
  }

  async updateUser (id: string, updateDto: updateDto) {
    return this.userRepository.updateUser(id, updateDto)
  }
  async getUserProfile(userId: string) {
    const userData = await this.userRepository.getUserById(userId);
    if (!userData) {
      throw new Error("user not found");
    }
    return userData;
  }
  async verifyUserEmail (email: string) {
    const foundUser = this.userRepository.verifyUserEmail(email)
    if (!foundUser) {
      throw new Error('User not found')
    }
    return foundUser
  }
  async verifyResetToken(id: string, token: string) {
    return this.userRepository.verifyResetToken(id, token)
  }
}
