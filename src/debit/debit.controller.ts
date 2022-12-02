import {
    Body,
    Controller,
    Get,
    HttpException,
    Param,
    Post,
} from '@nestjs/common';
import { CreateDebitDto } from './dtos/create-debit.dto';
import { DebitEntity } from './entity/debit.entity';
import { DebitService } from './debit.service';

@Controller('debit')
export class DebitController {
    constructor(private readonly debitService: DebitService) {}

    @Post()
    async create(
        @Body() debit: CreateDebitDto,
    ): Promise<DebitEntity | HttpException> {
        return this.debitService.create(debit);
    }

    @Get()
    async findAllById(@Param('id') id: string): Promise<DebitEntity[]> {
        return this.debitService.findAllById(id);
    }
}
