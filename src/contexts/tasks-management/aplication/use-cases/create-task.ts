import { TaskRepository } from '../../domain/ports/task.repository';

export class CreateTask {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    async execute(input: {
        title: string;
        description?: string;
        statusId: string;
        userId: string;
        dueDate?: Date | null;
    }) {
        return this.taskRepository.save({
            title: input.title,
            description: input.description ?? null,
            statusId: input.statusId,
            userId: input.userId,
            dueDate: input.dueDate ?? null,
            wasDeleted: false,
        });
    }
}
