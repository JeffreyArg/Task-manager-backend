import { IsOptional, IsUUID, IsISO8601, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListUserTasksQueryDto {
  @IsOptional()
  @IsUUID()
  status_id?: string;

  @IsOptional()
  @IsISO8601()
  due_date_from?: string;

  @IsOptional()
  @IsISO8601()
  due_date_to?: string;

  @IsOptional()
  search_text?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page_number?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page_size?: number;
}
