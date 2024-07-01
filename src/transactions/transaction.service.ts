import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDTO } from './dto/CreateTransactionDTO';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDTO, userId: string) {
    const newTransaction = await this.prisma.transaction.create({
      data: {
        title: data.title,
        amount: data.amount,
        category: data.category,
        type: data.type,
        isInstallment: data.isInstallment,
        installmentCount: data.installmentCount,
        userId,
      },
    });

    return newTransaction;
  }
}
