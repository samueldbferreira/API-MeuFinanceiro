import { Module } from '@nestjs/common';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, FamiliesService],
  controllers: [FamiliesController],
  exports: [FamiliesService]
})
export class FamiliesModule {}
