import { Module } from '@nestjs/common';
import { DatabaseModule } from './contexts/shared/database/database.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [],
})
export class AppModule {}
