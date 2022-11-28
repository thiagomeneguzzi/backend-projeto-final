import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientEntity } from '../client/entity/client.entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    public async generateJwt(
        user: ClientEntity,
    ): Promise<{ access_token: string }> {
        return { access_token: this.jwtService.sign(user) };
    }

    public async validateUser(token: string): Promise<any> {
        try {
            const user = this.jwtService.verify(token);
            return !!user;
        } catch (error) {
            throw new HttpException('invalid-token', HttpStatus.FORBIDDEN);
        }
    }
}
