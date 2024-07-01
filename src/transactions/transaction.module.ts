import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [PrismaService, TransactionService],
    controllers: [TransactionController],
})
export class TransactionModule {}
