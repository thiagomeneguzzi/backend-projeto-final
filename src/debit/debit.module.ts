import { Module } from '@nestjs/common';
import { DebitService } from './debit.service';
import { DebitController } from './debit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitEntity } from './entity/debit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DebitEntity])],
    providers: [DebitService],
    controllers: [DebitController],
    exports: [DebitService],
})
export class DebitModule {}
