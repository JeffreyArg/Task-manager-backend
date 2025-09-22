import { IsUUID, IsOptional, IsString, Length, IsISO8601 } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @Length(1, 255)
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsUUID()
    status_id: string;

    @IsUUID()
    user_id: string;

    @IsOptional()
    @IsISO8601()
    due_date?: string;
}
