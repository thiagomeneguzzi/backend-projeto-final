import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateClientDto } from './dtos/create-client.dto';
import { ClientEntity } from './entity/client.entity';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async create(
        @Body() client: CreateClientDto,
    ): Promise<ClientEntity | HttpException> {
        return this.clientService.create(client);
    }
}
