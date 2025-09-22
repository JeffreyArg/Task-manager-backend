import { IsUUID, IsOptional, IsString, Length, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({
        description: 'Título de la tarea',
        example: 'Completar proyecto',
        minLength: 1,
        maxLength: 255,
    })
    @IsString()
    @Length(1, 255)
    title: string;

    @ApiProperty({
        description: 'Descripción opcional de la tarea',
        example: 'Descripción detallada de lo que hay que hacer',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'ID del estado de la tarea',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        format: 'uuid',
    })
    @IsUUID()
    status_id: string;

    @ApiProperty({
        description: 'ID del usuario asignado a la tarea',
        example: 'b47ac10b-58cc-4372-a567-0e02b2c3d480',
        format: 'uuid',
    })
    @IsUUID()
    user_id: string;

    @ApiProperty({
        description: 'Fecha límite de la tarea en formato ISO 8601',
        example: '2025-12-31T23:59:59Z',
        required: false,
        format: 'date-time',
    })
    @IsOptional()
    @IsISO8601()
    due_date?: string;
}
