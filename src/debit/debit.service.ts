import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebitEntity } from './entity/debit.entity';
import { Repository } from 'typeorm';
import { Client, CreateDebitDto } from './dtos/create-debit.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class DebitService {
    constructor(
        @InjectRepository(DebitEntity)
        private readonly debitRepo: Repository<DebitEntity>,
    ) {}

    async create(debit: CreateDebitDto): Promise<DebitEntity | HttpException> {
        const debitFormatted = {
            client: JSON.parse(debit.client),
            value: Number(debit.value),
            description: debit.description,
            status: debit.status,
            process_number: Number(debit.process_number),
        };

        const debitEntity = this.debitRepo.create(debitFormatted);

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
                client: {
                    id: id,
                },
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
