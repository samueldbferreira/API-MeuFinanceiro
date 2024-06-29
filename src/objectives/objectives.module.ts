import { Module } from '@nestjs/common';
import { ObjectivesController } from './objectives.controller';
import { ObjectivesService } from './objectives.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, ObjectivesService],
  controllers: [ObjectivesController],
})
export class ObjectivesModule {}
