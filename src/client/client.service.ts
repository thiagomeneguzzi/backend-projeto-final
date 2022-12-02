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
        return this.clientRepo.find({
            relations: {
                debits: true,
            },
        });
    }

    async delete(id: string): Promise<boolean | HttpException> {
        const user = await this.clientRepo.findOneBy({ id });
        if (!user) {
            return new HttpException('client-not-found', HttpStatus.NOT_FOUND);
        }

        await this.clientRepo.delete(user);
        return true;
    }
}
