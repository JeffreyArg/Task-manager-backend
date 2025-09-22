import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/typeorm/entities/user.entity';
import { UsersService } from './infrastructure/services/users.service';
import { UsersController } from './infrastructure/controllers/users.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule { }
