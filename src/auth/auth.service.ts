import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dtos/user.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    public async generateJwt(user: UserDto): Promise<{ access_token: string }> {
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
