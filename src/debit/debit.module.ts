import { Module } from '@nestjs/common';
import { DebitService } from './debit.service';
import { DebitController } from './debit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitEntity } from './entity/debit.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
    imports: [TypeOrmModule.forFeature([DebitEntity]), NestjsFormDataModule],
    providers: [DebitService],
    controllers: [DebitController],
    exports: [DebitService],
})
export class DebitModule {}
