import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import * as crypto from 'crypto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        private readonly auth: AuthService,
    ) {}

    async create(user: UserDto): Promise<UserEntity | HttpException> {
        user.password = crypto
            .pbkdf2Sync(
                user.password,
                process.env.PASSWORD_HASH,
                1000,
                64,
                'sha512',
            )
            .toString('hex');

        const userEntity = this.userRepo.create(user);

        const createdUser = await this.userRepo.save(userEntity);
        if (!createdUser) {
            return new HttpException(
                'create-user-error',
                HttpStatus.BAD_REQUEST,
            );
        } else {
            delete createdUser.password;
            return createdUser;
        }
    }

    async login(user: UserDto): Promise<string | HttpException> {
        const userFound = await this.userRepo.findOneBy({
            email: user.email,
        });

        if (!userFound) {
            return new HttpException('user-not-found', HttpStatus.NOT_FOUND);
        }

        const hash = crypto
            .pbkdf2Sync(
                user.password,
                process.env.password_hash,
                1000,
                64,
                'sha512',
            )
            .toString('hex');

        let jwt;
        if (hash === userFound.password) {
            jwt = await this.auth.generateJwt({
                id: userFound.id,
                email: userFound.email,
            });
            return jwt;
        } else {
            return new HttpException('wrong-password', HttpStatus.FORBIDDEN);
        }
    }
}
