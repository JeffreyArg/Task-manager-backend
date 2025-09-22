import { TaskRepository } from '../../domain/ports/task.repository';

export class ListUserTasks {
    constructor(private readonly taskRepository: TaskRepository) { }

    async execute(
        userId: string,
        options: {
            statusId?: string;
            dueDateFrom?: Date;
            dueDateTo?: Date;
            searchText?: string;
            pageNumber?: number;
            pageSize?: number;
        },
    ) {
        return this.taskRepository.findByUserWithFilters(userId, options);
    }
}
