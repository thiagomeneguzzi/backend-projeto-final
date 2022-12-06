import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
} from 'class-validator';
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
    client: Client;

    @IsNotEmpty()
    // @IsNumber()
    // @IsPositive()
    @ApiProperty()
    value: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    // @IsBoolean()
    @ApiProperty()
    status: boolean;

    // @IsNumber()
    @ApiProperty()
    process_number: number;

    @ApiProperty()
    filename: string;

    // @IsString()
    // complement: string;
}
