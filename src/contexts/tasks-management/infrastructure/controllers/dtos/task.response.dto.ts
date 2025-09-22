import { TaskStatusResponseDto } from './task-status.response.dto';

export class TaskResponseDto {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatusResponseDto | null;
  status_id: string;
  user_id: string;
  due_date: string | null;
  was_deleted: boolean;
  created_at: string;
  updated_at: string;
}
