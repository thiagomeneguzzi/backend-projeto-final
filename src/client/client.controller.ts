import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateClientDto } from './dtos/create-client.dto';
import { ClientEntity } from './entity/client.entity';
import { ClientService } from './client.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Public()
    @Post()
    async create(
        @Body() client: CreateClientDto,
    ): Promise<ClientEntity | HttpException> {
        return this.clientService.create(client);
    }
}
