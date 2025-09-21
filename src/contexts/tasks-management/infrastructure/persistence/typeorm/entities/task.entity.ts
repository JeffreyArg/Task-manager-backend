import { AutoMap } from '@automapper/classes';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatusEntity } from './task-status.entity';

@Entity('tasks')
export class TaskEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @AutoMap()
  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @AutoMap()
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @AutoMap()
  @Column({ name: 'status_id', type: 'uuid' })
  statusId: string;

  @ManyToOne(() => TaskStatusEntity)
  @JoinColumn({ name: 'status_id' })
  status: TaskStatusEntity;

  @AutoMap()
  @Column({ name: 'due_date', type: 'timestamptz', nullable: true })
  dueDate: Date;

  @AutoMap()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
