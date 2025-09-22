import { TaskEntity } from '../../infrastructure/persistence/typeorm/entities/task.entity';
import { PaginationResult } from '../../../shared/pagination/pagination.types';

export interface TaskRepository {
    save(partialTask: Partial<TaskEntity>): Promise<TaskEntity>;

    findById(taskId: string): Promise<TaskEntity | null>;

    findByUserWithFilters(
        userId: string,
        filters: {
            statusId?: string;
            dueDateFrom?: Date;
            dueDateTo?: Date;
            searchText?: string;
            pageNumber?: number;
            pageSize?: number;
        }
    ): Promise<PaginationResult<TaskEntity>>;

    deleteByUser(taskId: string, userId: string): Promise<void>;
}
