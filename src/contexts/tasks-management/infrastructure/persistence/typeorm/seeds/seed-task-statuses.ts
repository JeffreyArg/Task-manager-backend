import 'reflect-metadata';
import { TaskStatusEntity } from '../entities/task-status.entity';
import AppDataSource from '../config/datasource';

async function run() {
  const dataSource = await AppDataSource.initialize();

  try {
    const repo = dataSource.getRepository(TaskStatusEntity);

    const statuses = ['PENDING', 'IN_PROGRESS', 'DONE'];

    await repo.upsert(
      statuses.map((name) => ({ name })),
      ['name']
    );

    console.log('Seed task_statuses is complete.');
  } catch (err) {
    console.error('Error seeding task_statuses:', err);
    process.exitCode = 1;
  } finally {
    await dataSource.destroy();
  }
}

run();
