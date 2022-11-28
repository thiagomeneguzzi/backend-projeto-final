import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entity/client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dtos/create-client.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepo: Repository<ClientEntity>,
    ) {}

    async create(
        client: CreateClientDto,
    ): Promise<ClientEntity | HttpException> {
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

    async findAll(): Promise<ClientEntity[]> {
        return Promise.resolve(undefined);
    }

    async findById(): Promise<ClientEntity> {
        return Promise.resolve(undefined);
    }

    async update(): Promise<ClientEntity> {
        return Promise.resolve(undefined);
    }

    async delete(): Promise<ClientEntity> {
        return Promise.resolve(undefined);
    }
}
