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

    @Post('upload')
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
    async upload(@UploadedFile() file: Express.Multer.File): Promise<{
        filename: string;
    }> {
        return { filename: file.filename };
    }

    @Get(':id')
    async findAllById(@Param('id') id: string): Promise<DebitEntity[]> {
        return this.debitService.findAllById(id);
    }
}
