import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { CreateDebitDto } from './dtos/create-debit.dto';
import { DebitEntity } from './entity/debit.entity';
import { DebitService } from './debit.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateDebitDto } from './dtos/update-debit.dto';

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

    @Get()
    async findAll(): Promise<DebitEntity[]> {
        return this.debitService.findAll();
    }

    @Get(':id')
    async findAllById(@Param('id') id: string): Promise<DebitEntity[]> {
        return this.debitService.findAllById(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: UpdateDebitDto,
    ): Promise<DebitEntity | HttpException> {
        return this.debitService.update(id, body);
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
    ): Promise<{ status: number } | HttpException> {
        return this.debitService.delete(id);
    }
}
