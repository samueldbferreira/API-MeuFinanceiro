import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ObjectivesModule } from './objectives/objectives.module';
import { TransactionModule } from './transactions/transaction.module';

@Module({
  imports: [AuthModule, UsersModule, ObjectivesModule, TransactionModule],
})
export class AppModule {}
