import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from '../persistence/typeorm/entities/user.entity';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ 
        summary: 'Crear nuevo usuario',
        description: 'Crea un nuevo usuario en el sistema con email y nombre'
    })
    @ApiCreatedResponse({ 
        type: UserEntity, 
        description: 'Usuario creado exitosamente' 
    })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser({
            email: createUserDto.email,
            name: createUserDto.name,
        });
    }

    @Get()
    @ApiOperation({ 
        summary: 'Listar usuarios',
        description: 'Obtiene la lista de todos los usuarios registrados en el sistema'
    })
    @ApiOkResponse({ 
        type: [UserEntity], 
        description: 'Lista de usuarios obtenida exitosamente' 
    })
    async listUsers() {
        return this.usersService.listUsers();
    }

    @Get(':userId')
    @ApiOperation({ 
        summary: 'Obtener usuario por ID',
        description: 'Obtiene los detalles de un usuario específico por su ID'
    })
    @ApiParam({ 
        name: 'userId', 
        description: 'ID único del usuario',
        example: 'b47ac10b-58cc-4372-a567-0e02b2c3d480'
    })
    @ApiOkResponse({ 
        type: UserEntity, 
        description: 'Detalles del usuario obtenidos exitosamente' 
    })
    async getUserById(@Param('userId') userId: string) {
        return this.usersService.getUserById(userId);
    }
}
