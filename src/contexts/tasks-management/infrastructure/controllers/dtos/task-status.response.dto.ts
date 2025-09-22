import { ApiProperty } from '@nestjs/swagger';

export class TaskStatusResponseDto {
  @ApiProperty({
    description: 'ID único del estado de tarea',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre del estado de tarea',
    example: 'In Progress',
  })
  name: string;
}
