import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { CreateTaskDto } from './dtos/create-task.dto';
import { ListUserTasksQueryDto } from './dtos/list-user-tasks.query.dto';
import { DeleteTask } from '../../aplication/use-cases/delete-task';
import { ListUserTasks } from '../../aplication/use-cases/list-user-tasks';
import { CreateTask } from '../../aplication/use-cases/create-task';

@Controller()
export class TasksController {
    constructor(
        private readonly createTaskUseCase: CreateTask,
        private readonly listUserTasksUseCase: ListUserTasks,
        private readonly deleteTaskUseCase: DeleteTask,
    ) { }

    @Post('tasks')
    async createTask(
        @Body() createTaskDto: CreateTaskDto
    ) {
        return this.createTaskUseCase.execute({
            title: createTaskDto.title,
            description: createTaskDto.description,
            statusId: createTaskDto.status_id,
            userId: createTaskDto.user_id,
            dueDate: createTaskDto.due_date ? new Date(createTaskDto.due_date) : undefined,
        });
    }

    @Get('users/:userId/tasks')
    async listUserTasks(
        @Param('userId') userId: string,
        @Query() query: ListUserTasksQueryDto,
    ) {
        return this.listUserTasksUseCase.execute(userId, {
            statusId: query.status_id,
            dueDateFrom: query.due_date_from ? new Date(query.due_date_from) : undefined,
            dueDateTo: query.due_date_to ? new Date(query.due_date_to) : undefined,
            searchText: query.search_text,
            pageNumber: query.page_number,
            pageSize: query.page_size,
        });
    }

    @Delete('tasks/:taskId')
    async deleteTask(
        @Param('taskId') taskId: string,
        @Query('userId') userId: string
    ) {
        await this.deleteTaskUseCase.execute(taskId, userId);
        return { ok: true };
    }
}
