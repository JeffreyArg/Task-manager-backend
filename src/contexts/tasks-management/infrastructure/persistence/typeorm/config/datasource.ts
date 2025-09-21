import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    'src/contexts/tasks-management/infrastructure/persistence/typeorm/entities/*.entity.ts',
  ],
  migrations: [
    'src/contexts/tasks-management/infrastructure/persistence/typeorm/migrations/*.ts',
  ],
  synchronize: false,
  logging: false,
});

export default AppDataSource;
