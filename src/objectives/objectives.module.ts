import { Module } from '@nestjs/common';
import { ObjectivesController } from './objectives.controller';
import { ObjectivesService } from './objectives.service';
import { PrismaService } from 'src/prisma.service';
import { FamiliesModule } from 'src/families/families.module';

@Module({
  providers: [PrismaService, ObjectivesService],
  controllers: [ObjectivesController],
  imports: [FamiliesModule]
})
export class ObjectivesModule {}
