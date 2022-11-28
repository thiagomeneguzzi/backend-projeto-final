import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    cpf: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    cep: string;

    @IsNumber()
    address_number: number;

    @IsString()
    complement: string;
}
