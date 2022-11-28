import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly clientRepo: Repository<UserEntity>,
    ) {}

    async create(
        client: CreateUserDto,
    ): Promise<UserEntity | HttpException> {
        const clientEntity = this.clientRepo.create(client);

        const createdClient = await this.clientRepo.save(clientEntity);
        if (!createdClient) {
            return new HttpException(
                'create-client-error',
                HttpStatus.BAD_REQUEST,
            );
        } else {
            return createdClient;
        }
    }

    async findAll(): Promise<UserEntity[]> {
        return Promise.resolve(undefined);
    }

    async findById(): Promise<UserEntity> {
        return Promise.resolve(undefined);
    }

    async update(): Promise<UserEntity> {
        return Promise.resolve(undefined);
    }

    async delete(): Promise<UserEntity> {
        return Promise.resolve(undefined);
    }
}
