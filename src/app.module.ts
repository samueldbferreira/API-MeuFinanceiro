import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ObjectivesModule } from './objectives/objectives.module';

@Module({
  imports: [AuthModule, UsersModule, ObjectivesModule],
})
export class AppModule {}
