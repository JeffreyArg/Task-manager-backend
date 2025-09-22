import { IsOptional, IsUUID, IsISO8601, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListUserTasksQueryDto {
  @IsOptional()
  @IsUUID()
  statusId?: string;

  @IsOptional()
  @IsISO8601()
  dueDateFrom?: string;

  @IsOptional()
  @IsISO8601()
  dueDateTo?: string;

  @IsOptional()
  searchText?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNumber?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number;
}
