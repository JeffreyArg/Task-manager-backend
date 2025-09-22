import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../persistence/typeorm/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userOrmRepository: Repository<UserEntity>,
    ) { }

    async createUser(params: { email: string; name: string }) {
        const exists = await this.userOrmRepository.findOne(
            { where: { email: params.email } }
        );
        if (exists) {
            throw new ConflictException('Email already exists');
        }
        const row = this.userOrmRepository.create(
            { email: params.email, name: params.name }
        );
        return this.userOrmRepository.save(row);
    }

    async getUserById(userId: string) {
        const user = await this.userOrmRepository.findOne(
            {
                where: { id: userId }
            });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async listUsers() {
        return this.userOrmRepository.find(
            { order: { createdAt: 'DESC' } }
        );
    }
}
