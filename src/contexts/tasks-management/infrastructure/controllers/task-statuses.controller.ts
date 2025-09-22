import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOkResponse({ type: [TaskStatusEntity] })
  async listTaskStatuses() {
    return this.taskStatusRepository.find({ order: { name: 'ASC' } });
  }
}
