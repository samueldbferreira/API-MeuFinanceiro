import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateObjectiveDTO } from './dto/CreateObjectiveDTO';
import { FamiliesService } from 'src/families/families.service';
import { UpdateObjectiveDTO } from './dto/UpdateObjectiveDTO';

@Injectable()
export class ObjectivesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly familiesService: FamiliesService,
  ) {}

  async createObjective(data: CreateObjectiveDTO, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    const familyId =
      user.familyId ?? (await this.familiesService.createFamily()).id;

    const newObjective = await this.prisma.objective.create({
      data: {
        title: data.title,
        total: data.total,
        userId,
        familyId,
      },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { familyId: familyId },
    });

    return newObjective;
  }

  async getObjectives(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user.familyId) {
      return [];
    }

    return await this.prisma.objective.findMany({
      where: { familyId: user.familyId },
      include: { creator: { select: { firstName: true, lastName: true } } },
    });
  }

  async getObjective(objectiveId: string) {
    const objective = await this.prisma.objective.findUnique({
      where: { id: objectiveId },
      include: { creator: { select: { firstName: true, lastName: true } } },
    });
    if (!objective) {
      return null;
    }

    return objective;
  }

  async deleteObjective(objectiveId: string) {
    const objective = await this.prisma.objective.findUnique({
      where: { id: objectiveId },
    });
    if (objective) {
      await this.prisma.objective.delete({ where: { id: objectiveId } });
    }
  }

  async updateObjective(
    objectiveId: string,
    objectiveData: UpdateObjectiveDTO,
  ) {
    const objective = await this.prisma.objective.findUnique({
      where: { id: objectiveId },
    });
    if (!objective) {
      throw new BadRequestException('ID do objetivo é inválido');
    }

    await this.prisma.objective.update({
      where: { id: objectiveId },
      data: objectiveData,
    });
  }
}
