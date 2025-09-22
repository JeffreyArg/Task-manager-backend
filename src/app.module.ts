import { Module } from '@nestjs/common';
import { DatabaseModule } from './contexts/shared/database/database.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TasksModule } from './contexts/tasks-management/tasks.module';

@Module({
  imports: [
    DatabaseModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TasksModule,
  ],
  controllers: [],
})
export class AppModule {}
