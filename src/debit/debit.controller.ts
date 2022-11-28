import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateDebitDto } from './dtos/create-debit.dto';
import { DebitEntity } from './entity/debit.entity';
import { DebitService } from './debit.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('client')
export class DebitController {
    constructor(private readonly clientService: DebitService) {}

    @Public()
    @Post()
    async create(
        @Body() client: CreateDebitDto,
    ): Promise<DebitEntity | HttpException> {
        return this.clientService.create(client);
    }
}
