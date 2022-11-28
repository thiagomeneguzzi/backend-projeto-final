import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('client')
export class UserController {
    constructor(private readonly clientService: UserService) {}

    @Public()
    @Post()
    async create(
        @Body() client: CreateUserDto,
    ): Promise<UserEntity | HttpException> {
        return this.clientService.create(client);
    }
}
