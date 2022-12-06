import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface Client {
    id: string;
    name: string;
    cpf: string;
    email: string;
    cep: string;
    address_number: number;
    complement: string;
}

export class CreateDebitDto {
    @IsNotEmpty()
    @ApiProperty()
    client: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    value: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    status: string;

    @IsString()
    @ApiProperty()
    process_number: string;

    @ApiProperty()
    filename: string;
}
