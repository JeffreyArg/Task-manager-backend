import { IsUUID, IsOptional, IsString, Length, IsISO8601 } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @Length(1, 255)
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsUUID()
    statusId: string;

    @IsUUID()
    userId: string;

    @IsOptional()
    @IsISO8601()
    dueDate?: string;
}
