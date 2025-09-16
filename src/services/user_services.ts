import { UserRepository } from "../repositories/user_repository";
import { updateProfileDto } from "../dtos/user.dto";

import { Request, Response } from 'express';


export class UserService {
  private userRepository = new UserRepository();

  constructor() {
    this.userRepository = new UserRepository();
  }
  
  async updateProfile(id: string, data: updateProfileDto) {
        return await this.userRepository.updateProfile(id, data);
    }

  async getUserProfile(userId: string) {
    const userData = await this.userRepository.getUserById(userId);
    if (!userData) {
        throw new Error('user not found')
    }

    return userData
  }
}
