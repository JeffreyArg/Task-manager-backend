import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './infrastructure/persistence/typeorm/entities/task.entity';
import { TaskRepositoryAdapter } from './infrastructure/persistence/typeorm/repositories/task.repository.adapter';
import { TasksController } from './infrastructure/controllers/task-controller';
import { CreateTask } from './aplication/use-cases/create-task';
import { ListUserTasks } from './aplication/use-cases/list-user-tasks';
import { DeleteTask } from './aplication/use-cases/delete-task';
import { UserEntity } from './infrastructure/persistence/typeorm/entities/user.entity';
import { TaskStatusEntity } from './infrastructure/persistence/typeorm/entities/task-status.entity';


@Module({
    imports: [TypeOrmModule.forFeature([
        TaskEntity,
        UserEntity,
        TaskStatusEntity,
    ])],
    controllers: [TasksController],
    providers: [
        { provide: 'TaskRepository', useClass: TaskRepositoryAdapter },
        { provide: CreateTask, useFactory: (repo: any) => new CreateTask(repo), inject: ['TaskRepository'] },
        { provide: ListUserTasks, useFactory: (repo: any) => new ListUserTasks(repo), inject: ['TaskRepository'] },
        { provide: DeleteTask, useFactory: (repo: any) => new DeleteTask(repo), inject: ['TaskRepository'] },
    ],
})
export class TasksModule { }
