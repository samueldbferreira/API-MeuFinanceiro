import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateObjectiveDTO } from './dto/CreateObjectiveDTO';

@Injectable()
export class ObjectivesService {
  constructor(private readonly prisma: PrismaService) {}

  async createObjective(data: CreateObjectiveDTO, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    const familyId =
      user.familyId ?? (await this.prisma.family.create({ data: {} })).id;

    const newObjective = await this.prisma.objective.create({
      data: {
        title: data.title,
        total: data.total,
        userId,
        familyId,
      },
    });

    return newObjective;
  }
}
