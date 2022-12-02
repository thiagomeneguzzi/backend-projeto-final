import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Post,
} from '@nestjs/common';
import { CreateClientDto } from './dtos/create-client.dto';
import { ClientEntity } from './entity/client.entity';
import { ClientService } from './client.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('client')
@ApiTags('Client')
@ApiBearerAuth()
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async create(
        @Body() client: CreateClientDto,
    ): Promise<ClientEntity | HttpException> {
        return this.clientService.create(client);
    }

    @Get()
    async findAll(): Promise<ClientEntity[]> {
        return this.clientService.findAll();
    }

    @Delete()
    async delete(@Param('id') id: string): Promise<boolean | HttpException> {
        return this.clientService.delete(id);
    }
}
