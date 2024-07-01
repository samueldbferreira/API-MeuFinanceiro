import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/CreateTransactionDTO';
import { TransactionService } from './transaction.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('')
  async createTransaction(@Req() req, @Body() bodyData: CreateTransactionDTO) {
    const { sub: userId } = req.user;

    if (bodyData.type === 'Despesa' && !bodyData.category) {
      throw new BadRequestException('Informe a categoria.');
    }

    if (bodyData.isInstallment && !bodyData.installmentCount) {
      throw new BadRequestException('Informe a quantidade de parcelas.');
    }

    return await this.transactionService.createTransaction(bodyData, userId);
  }
}
