import { IsOptional, IsUUID, IsISO8601, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListUserTasksQueryDto {
  @ApiProperty({
    description: 'Filtrar por ID de estado de tarea',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  status_id?: string;

  @ApiProperty({
    description: 'Filtrar tareas con fecha límite desde esta fecha',
    example: '2025-01-01T00:00:00Z',
    required: false,
    format: 'date-time',
  })
  @IsOptional()
  @IsISO8601()
  due_date_from?: string;

  @ApiProperty({
    description: 'Filtrar tareas con fecha límite hasta esta fecha',
    example: '2025-12-31T23:59:59Z',
    required: false,
    format: 'date-time',
  })
  @IsOptional()
  @IsISO8601()
  due_date_to?: string;

  @ApiProperty({
    description: 'Buscar texto en el título o descripción de las tareas',
    example: 'proyecto importante',
    required: false,
  })
  @IsOptional()
  search_text?: string;

  @ApiProperty({
    description: 'Número de página para paginación',
    example: 1,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page_number?: number;

  @ApiProperty({
    description: 'Tamaño de página para paginación',
    example: 10,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page_size?: number;
}
