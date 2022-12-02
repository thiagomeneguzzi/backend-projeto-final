import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebitEntity } from './entity/debit.entity';
import { Repository } from 'typeorm';
import { CreateDebitDto } from './dtos/create-debit.dto';

@Injectable()
export class DebitService {
    constructor(
        @InjectRepository(DebitEntity)
        private readonly debitRepo: Repository<DebitEntity>,
    ) {}

    async create(debit: CreateDebitDto): Promise<DebitEntity | HttpException> {
        const debitEntity = this.debitRepo.create(debit);

        const createdDebit = await this.debitRepo.save(debitEntity);
        if (!createdDebit) {
            return new HttpException(
                'create-debit-error',
                HttpStatus.BAD_REQUEST,
            );
        } else {
            return createdDebit;
        }
    }

    async findAllById(id: string): Promise<DebitEntity[]> {
        const debits = this.debitRepo.find({
            where: {
                id,
            },
            relations: {
                client: true,
            },
        });

        return debits;
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
