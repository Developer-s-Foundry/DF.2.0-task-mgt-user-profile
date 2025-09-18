import { TaskRepository } from '../repositories/task_repository';

export class TaskService {
  private taskRepository = new TaskRepository();

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async getTaskById(taskId: string) {
    const taskData = await this.taskRepository.getTaskById(taskId);
    if (!taskData) {
      console.log(13)
      throw new Error('task not found');
    }

    return taskData;
  }

  async getUserTask(userId: string) {
    const taskData = await this.taskRepository.getTaskByUserId(userId);
    if (!taskData) {
      throw new Error('task not found');
    }

    return taskData;
  }
}
