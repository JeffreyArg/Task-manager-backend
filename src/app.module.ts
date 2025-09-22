import { Module } from '@nestjs/common';
import { DatabaseModule } from './contexts/shared/database/database.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TasksModule } from './contexts/tasks-management/tasks.module';
import { UsersModule } from './contexts/tasks-management/user.module';

@Module({
  imports: [
    DatabaseModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TasksModule,
    UsersModule,
  ],
  controllers: [],
})
export class AppModule {}
