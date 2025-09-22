import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('DB_HOST') ?? 'localhost',
        port: parseInt(cfg.get<string>('DB_PORT') ?? '5432', 10),
        username: cfg.get<string>('DB_USER') ?? 'task_user',
        password: cfg.get<string>('DB_PASS') ?? 'task_password',
        database: cfg.get<string>('DB_NAME') ?? 'task_management_db',
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule { }
