import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { TaskRepository } from '../../../../domain/ports/task.repository';
import { paginateQueryBuilder } from '../../../../../shared/pagination/pagination.util';

@Injectable()
export class TaskRepositoryAdapter implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskOrmRepository: Repository<TaskEntity>,
  ) {}

  async save(partialTask: Partial<TaskEntity>): Promise<TaskEntity> {
    const taskRow = this.taskOrmRepository.create(partialTask);
    return this.taskOrmRepository.save(taskRow);
  }

  async findById(taskId: string): Promise<TaskEntity | null> {
    return this.taskOrmRepository.findOne({
      where: { id: taskId, wasDeleted: false },
      relations: { status: true, user: false },
    });
  }

  async findByUserWithFilters(
    userId: string,
    filters: {
      statusId?: string;
      dueDateFrom?: Date;
      dueDateTo?: Date;
      searchText?: string;
      pageNumber?: number;
      pageSize?: number;
    },
  ) {
    const queryBuilder = this.taskOrmRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.status', 'taskStatus')
      .where('task.user_id = :userId', { userId })
      .andWhere('task.was_deleted = false')
      .orderBy('task.created_at', 'DESC');

    if (filters.statusId) {
      queryBuilder.andWhere('task.status_id = :statusId', { statusId: filters.statusId });
    }
    if (filters.dueDateFrom) {
      queryBuilder.andWhere('task.due_date >= :dueDateFrom', { dueDateFrom: filters.dueDateFrom });
    }
    if (filters.dueDateTo) {
      queryBuilder.andWhere('task.due_date <= :dueDateTo', { dueDateTo: filters.dueDateTo });
    }
    if (filters.searchText) {
      queryBuilder.andWhere('(task.title ILIKE :searchText OR task.description ILIKE :searchText)', {
        searchText: `%${filters.searchText}%`,
      });
    }

    return paginateQueryBuilder(queryBuilder, {
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
    });
  }

  async deleteByUser(taskId: string, userId: string): Promise<void> {
    await this.taskOrmRepository.update({ id: taskId, userId }, { wasDeleted: true });
  }
}
