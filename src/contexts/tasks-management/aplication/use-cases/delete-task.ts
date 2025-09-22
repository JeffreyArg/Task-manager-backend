import { TaskRepository } from '../../domain/ports/task.repository';

export class DeleteTask {
    constructor(private readonly taskRepository: TaskRepository) { }

    async execute(taskId: string, userId: string) {
        await this.taskRepository.deleteByUser(taskId, userId);
    }
}
