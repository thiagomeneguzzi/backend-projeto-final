import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum STATUS {
    PENDING,
    PAID,
}

export class UpdateDebitDto {
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
    process_number?: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    filename?: string;
}
