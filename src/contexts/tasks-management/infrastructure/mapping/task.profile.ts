import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  Mapper,
  createMap,
  forMember,
  mapFrom,
  CamelCaseNamingConvention,
  SnakeCaseNamingConvention,
  namingConventions,
} from '@automapper/core';
import { TaskEntity } from '../persistence/typeorm/entities/task.entity';
import { TaskStatusEntity } from '../persistence/typeorm/entities/task-status.entity';
import { TaskResponseDto } from '../controllers/dtos/task.response.dto';

@Injectable()
export class TaskProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        TaskEntity,
        TaskResponseDto,
        namingConventions({
          source: new CamelCaseNamingConvention(),
          destination: new SnakeCaseNamingConvention(),
        }),
        forMember(d => d.description, mapFrom(s => s.description ?? null)),
        forMember(d => d.due_date,    mapFrom(s => (s.dueDate ? s.dueDate.toISOString() : null))),
        forMember(d => d.created_at,  mapFrom(s => s.createdAt.toISOString())),
        forMember(d => d.updated_at,  mapFrom(s => s.updatedAt.toISOString())),
        forMember(d => d.status_id,   mapFrom(s => s.statusId)),
        forMember(d => d.user_id,     mapFrom(s => s.userId)),
        forMember(d => d.was_deleted, mapFrom(s => s.wasDeleted)),
        forMember(d => d.status, mapFrom((s: TaskEntity) => {
          const st = s.status as TaskStatusEntity | undefined;
          return st ? { id: st.id, name: st.name } : null;
        })),
      );
    };
  }
}
