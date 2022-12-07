import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebitEntity } from './entity/debit.entity';
import { Repository } from 'typeorm';
import { CreateDebitDto } from './dtos/create-debit.dto';
import { UpdateDebitDto } from './dtos/update-debit.dto';

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
        return this.debitRepo.find({
            where: {
                client: {
                    id: id,
                },
            },
            relations: {
                client: true,
            },
        });
    }

    async delete(id: string): Promise<{ status: number } | HttpException> {
        const debit = await this.debitRepo.findOneBy({ id });

        if (!debit) {
            return new HttpException(
                'debit-doesnt-exist',
                HttpStatus.NOT_FOUND,
            );
        }

        await this.debitRepo.remove(debit);

        return {
            status: 204,
        };
    }

    async update(
        id: string,
        body: UpdateDebitDto,
    ): Promise<DebitEntity | HttpException> {
        const debit = await this.debitRepo.findOneBy({ id });
        if (!debit) {
            return new HttpException(
                'debit-doesnt-exist',
                HttpStatus.NOT_FOUND,
            );
        }

        await this.debitRepo.update({ id }, body);

        const debitUpdated = await this.debitRepo.findOne({
            where: {
                id: id,
            },
            relations: {
                client: true,
            },
        });

        return debitUpdated;
    }
}
