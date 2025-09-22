import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

import { CreateTaskDto } from './dtos/create-task.dto';
import { ListUserTasksQueryDto } from './dtos/list-user-tasks.query.dto';
import { TaskResponseDto } from './dtos/task.response.dto';
import { DeleteTask } from '../../aplication/use-cases/delete-task';
import { ListUserTasks } from '../../aplication/use-cases/list-user-tasks';
import { CreateTask } from '../../aplication/use-cases/create-task';

@ApiTags('Tasks')
@Controller()
export class TasksController {
    constructor(
        private readonly createTaskUseCase: CreateTask,
        private readonly listUserTasksUseCase: ListUserTasks,
        private readonly deleteTaskUseCase: DeleteTask,
    ) { }

    @Post('tasks')
    @ApiOperation({ 
        summary: 'Crear nueva tarea',
        description: 'Crea una nueva tarea con los datos proporcionados'
    })
    @ApiBody({ type: CreateTaskDto })
    @ApiCreatedResponse({ 
        type: TaskResponseDto, 
        description: 'Tarea creada exitosamente'
    })
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
    @ApiOperation({ 
        summary: 'Listar tareas de usuario',
        description: 'Obtiene todas las tareas asignadas a un usuario específico con filtros opcionales'
    })
    @ApiParam({ 
        name: 'userId', 
        description: 'ID del usuario',
        example: 'b47ac10b-58cc-4372-a567-0e02b2c3d480'
    })
    @ApiOkResponse({ 
        type: [TaskResponseDto], 
        description: 'Lista de tareas del usuario'
    })
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
    @ApiOperation({ 
        summary: 'Eliminar tarea',
        description: 'Elimina una tarea específica del sistema'
    })
    @ApiParam({ 
        name: 'taskId', 
        description: 'ID de la tarea a eliminar',
        example: 'a47ac10b-58cc-4372-a567-0e02b2c3d481'
    })
    @ApiQuery({ 
        name: 'userId', 
        description: 'ID del usuario que elimina la tarea',
        example: 'b47ac10b-58cc-4372-a567-0e02b2c3d480'
    })
    @ApiOkResponse({ 
        description: 'Tarea eliminada exitosamente',
        schema: {
            type: 'object',
            properties: {
                ok: { type: 'boolean', example: true }
            }
        }
    })
    async deleteTask(
        @Param('taskId') taskId: string,
        @Query('userId') userId: string
    ) {
        await this.deleteTaskUseCase.execute(taskId, userId);
        return { ok: true };
    }
}
