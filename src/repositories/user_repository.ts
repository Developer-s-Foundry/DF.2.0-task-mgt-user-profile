// import the database cursor
import { databaseConfig } from '../common/config/database';
import { User } from '../models/userModel';
import { updateProfileDto } from '../dtos/user.dto';

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

  async getUserById(id: string): Promise<User | null> {
    return await userRepo.findOne({ where: { id } });
  }
}
