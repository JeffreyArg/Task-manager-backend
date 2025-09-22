import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from '../persistence/typeorm/entities/user.entity';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiCreatedResponse({ type: UserEntity, description: 'Crea un usuario' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser({
            email: createUserDto.email,
            name: createUserDto.name,
        });
    }

    @Get()
    @ApiOkResponse({ type: [UserEntity], description: 'Lista de usuarios' })
    async listUsers() {
        return this.usersService.listUsers();
    }

    @Get(':userId')
    @ApiOkResponse({ type: UserEntity, description: 'Detalle de usuario' })
    async getUserById(@Param('userId') userId: string) {
        return this.usersService.getUserById(userId);
    }
}
