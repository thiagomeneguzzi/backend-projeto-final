import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebitEntity } from './entity/debit.entity';
import { Repository } from 'typeorm';
import { CreateDebitDto } from './dtos/create-debit.dto';

@Injectable()
export class DebitService {
    constructor(
        @InjectRepository(DebitEntity)
        private readonly clientRepo: Repository<DebitEntity>,
    ) {}

    async create(client: CreateDebitDto): Promise<DebitEntity | HttpException> {
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

    async findAll(): Promise<DebitEntity[]> {
        return Promise.resolve(undefined);
    }

    async findById(): Promise<DebitEntity> {
        return Promise.resolve(undefined);
    }

    async update(): Promise<DebitEntity> {
        return Promise.resolve(undefined);
    }

    async delete(): Promise<DebitEntity> {
        return Promise.resolve(undefined);
    }
}
