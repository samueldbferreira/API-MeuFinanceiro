import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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

    return await this.transactionService.createTransaction(bodyData, userId);
  }
}
