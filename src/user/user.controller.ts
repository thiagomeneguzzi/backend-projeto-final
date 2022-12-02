import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { Public } from '../auth/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post('login')
    async login(@Body() user: UserDto): Promise<string | HttpException> {
        return this.userService.login(user);
    }

    @Public()
    @Post()
    async create(@Body() user: UserDto): Promise<UserEntity | HttpException> {
        return this.userService.create(user);
    }
}
