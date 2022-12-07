import {
    Body,
    Controller,
    Get,
    HttpException,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { CreateDebitDto } from './dtos/create-debit.dto';
import { DebitEntity } from './entity/debit.entity';
import { DebitService } from './debit.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('debit')
@ApiTags('Debit')
@ApiBearerAuth()
export class DebitController {
    constructor(private readonly debitService: DebitService) {}

    @Post()
    async create(
        @Body() debit: CreateDebitDto,
    ): Promise<DebitEntity | HttpException> {
        return this.debitService.create(debit);
    }

    @Get(':id')
    async findAllById(@Param('id') id: string): Promise<DebitEntity[]> {
        return this.debitService.findAllById(id);
    }
}
