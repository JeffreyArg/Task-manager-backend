import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatusEntity } from '../persistence/typeorm/entities/task-status.entity';

@ApiTags('TaskStatuses')
@Controller('task-statuses')
export class TaskStatusesController {
  constructor(
    @InjectRepository(TaskStatusEntity)
    private readonly taskStatusRepository: Repository<TaskStatusEntity>,
  ) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar estados de tareas',
    description: 'Obtiene todos los estados de tareas disponibles en el sistema, ordenados alfabéticamente'
  })
  @ApiOkResponse({ 
    type: [TaskStatusEntity],
    description: 'Lista de estados de tareas'
  })
  async listTaskStatuses() {
    return this.taskStatusRepository.find({ order: { name: 'ASC' } });
  }
}
