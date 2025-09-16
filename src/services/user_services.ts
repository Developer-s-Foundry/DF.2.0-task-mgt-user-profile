import { UserRepository } from "../repositories/user_repository";
import { updateDto } from "../dtos/user.dto";

import { Request, Response } from 'express';


export class UserService {
  private userRepository = new UserRepository();

  constructor() {
    this.userRepository = new UserRepository();
  }

   async updateProfile(email: string, data: updateDto) {
        return await this.userRepository.updateProfile(email, data);
        
    }

  async getUserProfile(req: Request, res: Response) {
    const userId = req.params.id;

    const userData = await this.userRepository.getUserById(userId);
    if (!userData) {
      res.status(404).json({
        status: 'Error',
        message: 'User not found',
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'User profile retrieved successfully',
      data: userData,
    });
  }
}
