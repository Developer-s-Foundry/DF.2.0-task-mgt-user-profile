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
import { ResponseHandler } from '../utils/response';

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
     return new ResponseHandler({
       data: task,
       message: "Task successfully fetched",
       statusCode: this.setStatus(200),
       status: "success",
     });
  }

  @Response<GetTaskError>('default', 'task not found')
  @SuccessResponse(200, 'fetch task successful')
  @Get('{userId}/user')
  public async getUserTask(@Path() userId: string) {
    const task = await this.taskService.getUserTask(userId);
    return new ResponseHandler({
      data: task,
      message: "User task successfully fetched",
      statusCode: this.setStatus(200),
      status: "success",
    });
  }
}
