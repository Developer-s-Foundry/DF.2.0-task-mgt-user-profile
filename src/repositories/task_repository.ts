// import the database cursor
import { databaseConfig } from '../common/config/database';
import { Task } from '../models/taskModel';

const taskRepo = databaseConfig.getRepository(Task);

export class TaskRepository {
  async getTaskById(id: string): Promise<Task | null> {
    return await taskRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async getTaskByUserId(userId: string): Promise<Task[] | null> {
    return await taskRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
