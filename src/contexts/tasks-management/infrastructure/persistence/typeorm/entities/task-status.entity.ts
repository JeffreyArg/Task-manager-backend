import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('task_statuses')
export class TaskStatusEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @AutoMap()
  @Column({ name: 'name', type: 'varchar', length: 50, unique: true })
  name: string;
}
