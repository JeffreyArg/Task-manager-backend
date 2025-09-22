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
            statusId: createTaskDto.statusId,
            userId: createTaskDto.userId,
            dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
        });
    }

    @Get('users/:userId/tasks')
    async listUserTasks(
        @Param('userId') userId: string,
        @Query() query: ListUserTasksQueryDto,
    ) {
        return this.listUserTasksUseCase.execute(userId, {
            statusId: query.statusId,
            dueDateFrom: query.dueDateFrom ? new Date(query.dueDateFrom) : undefined,
            dueDateTo: query.dueDateTo ? new Date(query.dueDateTo) : undefined,
            searchText: query.searchText,
            pageNumber: query.pageNumber,
            pageSize: query.pageSize,
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
