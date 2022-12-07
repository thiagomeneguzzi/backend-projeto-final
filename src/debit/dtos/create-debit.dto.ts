import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

export enum STATUS {
    PENDING,
    PAID,
}

export class CreateDebitDto {
    @IsNotEmpty()
    @ApiProperty()
    client: Client;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    value: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    status: STATUS;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    process_number: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    filename: string;
}
