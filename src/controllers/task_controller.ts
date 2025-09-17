import { TaskService } from '../services/task_services';
import {
  Body,
  Controller,
  Get,
  Path,
  Patch,
  Route,
  Response,
  SuccessResponse,
} from 'tsoa';
import { GetTaskError } from '../dtos/error.dto';

@Route('/task')
export class TaskController extends Controller {
  private taskService = new TaskService();

  constructor() {
    super();
    this.taskService = this.taskService;
  }

  @Response<GetTaskError>('default', 'task not found')
  @SuccessResponse(200, 'fetch task successful')
  @Get('{taskId}')
  public async getTask(@Path() taskId: string) {
    const task = await this.taskService.getTaskById(taskId);
    this.setStatus(200);
    return task;
  }

  @Response<GetTaskError>('default', 'task not found')
  @SuccessResponse(200, 'fetch task successful')
  @Get('{userId}/user')
  public async getUserTask(@Path() userId: string) {
    const task = await this.taskService.getUserTask(userId);
    this.setStatus(200);
    return task;
  }
}
