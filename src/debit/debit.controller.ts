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

@Controller('debit')
export class DebitController {
    constructor(private readonly debitService: DebitService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const fileNameSplit = file.originalname.split('.');
                    const fileExt = fileNameSplit[fileNameSplit.length - 1];
                    cb(null, `${Date.now()}.${fileExt}`);
                },
            }),
        }),
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() debit: CreateDebitDto,
    ): Promise<DebitEntity | HttpException> {
        debit.filename = file.filename;
        return this.debitService.create(debit);
    }

    @Get()
    async findAllById(@Param('id') id: string): Promise<DebitEntity[]> {
        return this.debitService.findAllById(id);
    }
}
