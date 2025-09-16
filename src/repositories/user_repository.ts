import { databaseConfig } from '../common/config/database';
import { User } from '../models/userModel';

const userRepo = databaseConfig.getRepository(User);

export class UserRepository {
  async getUserById(id: string): Promise<User | null> {
    return await userRepo.findOne({ where: { id } });
  }
}
