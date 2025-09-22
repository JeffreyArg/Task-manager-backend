import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @AutoMap()
  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @AutoMap()
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
