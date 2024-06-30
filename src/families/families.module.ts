import { Module } from '@nestjs/common';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PrismaService, FamiliesService],
  controllers: [FamiliesController],
  imports: [UsersModule],
  exports: [FamiliesService]
})
export class FamiliesModule {}
