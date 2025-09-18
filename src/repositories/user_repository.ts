// import the database cursor
import { databaseConfig } from '../common/config/database';
import { User } from '../models/userModel';
import { updateProfileDto } from '../dtos/user.dto';
import bcrypt from "bcrypt"
import { updateDto } from '../dtos/user.dto';
import crypto from 'node:crypto'
import APP_CONFIGS from '../common/config';
import { MoreThan } from 'typeorm';



const userRepo = databaseConfig.getRepository(User);

export class UserRepository {
  // update profile of user
  async updateProfile(id: string, data: updateProfileDto) {
    const user = await userRepo.findOneBy({ id: id });
    if (!user) {
      throw new Error('user not found');
    }

    // Merge data into user object
    userRepo.merge(user, data);
    const updatedUser = await userRepo.save(user);
    return updatedUser;
  }
  async updateUser (id: string, updateData: updateDto) {
    const user = await userRepo.findOneBy({ id: id });
    if (!user) {
      throw new Error('user not found');
    }

    // Merge data into user object
    userRepo.merge(user, updateData);
    const updatedUser = await userRepo.save(user);
    return updatedUser;
  }

  async getUserById(id: string): Promise<User | null> {
    return await userRepo.findOne({ where: { id } });
  }

  async hashUserPassword (password: string) {
    const salt = await bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt);

  }

  async verifyUserEmail(email: string) {
    const foundUser = await userRepo.findOne({
      where : {
        email: email}})
     return foundUser
  }

   async verifyResetToken(id: string, token: string) {
    const secret = APP_CONFIGS.PASSWORD_HASH_SECRET
          const incomingHash = crypto.createHmac('sha256', secret)
                        .update(token)
                        .digest('hex');
    const foundUser = await userRepo.findOne({
      where : {
        id: id,
        reset_token_hash: incomingHash,
        reset_token_expiry: MoreThan(new Date()) // not expired
      }})
     if (!foundUser) {
      throw new Error('invalid or expired token')
     }
     // clear token and the expiration
     foundUser.reset_token_expiry = null
     foundUser.reset_token_hash = null
     return {
      message: 'verification successful',
      successful: true
     }
  }
}
