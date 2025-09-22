import { ApiProperty } from '@nestjs/swagger';
import { TaskStatusResponseDto } from './task-status.response.dto';

export class TaskResponseDto {
  @ApiProperty({
    description: 'ID único de la tarea',
    example: 'a47ac10b-58cc-4372-a567-0e02b2c3d481',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Completar proyecto',
  })
  title: string;

  @ApiProperty({
    description: 'Descripción de la tarea',
    example: 'Descripción detallada de la tarea',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Estado actual de la tarea',
    type: () => TaskStatusResponseDto,
    nullable: true,
  })
  status: TaskStatusResponseDto | null;

  @ApiProperty({
    description: 'ID del estado de la tarea',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  status_id: string;

  @ApiProperty({
    description: 'ID del usuario asignado',
    example: 'b47ac10b-58cc-4372-a567-0e02b2c3d480',
    format: 'uuid',
  })
  user_id: string;

  @ApiProperty({
    description: 'Fecha límite de la tarea en formato ISO 8601',
    example: '2025-12-31T23:59:59.000Z',
    nullable: true,
    format: 'date-time',
  })
  due_date: string | null;

  @ApiProperty({
    description: 'Indica si la tarea fue eliminada',
    example: false,
  })
  was_deleted: boolean;

  @ApiProperty({
    description: 'Fecha de creación en formato ISO 8601',
    example: '2025-01-01T10:00:00.000Z',
    format: 'date-time',
  })
  created_at: string;

  @ApiProperty({
    description: 'Fecha de última actualización en formato ISO 8601',
    example: '2025-01-02T15:30:00.000Z',
    format: 'date-time',
  })
  updated_at: string;
}
