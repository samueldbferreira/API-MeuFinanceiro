import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FamiliesService {
  constructor(private readonly prisma: PrismaService, private readonly usersServices: UsersService) {}

  async createFamily() {
    return await this.prisma.family.create({ data: {}});
  }

  async addMember(userId: string, targetUserEmail: string) {
    const targetUser = await this.usersServices.findByEmail(targetUserEmail);
    if (!targetUser) {
      throw new BadRequestException("Este email não está cadastrado.");
    }

    const user = await this.usersServices.findById(userId);
    const familyId = user.familyId ?? (await this.createFamily()).id;

    if (targetUser.familyId && targetUser.familyId === familyId) {
      throw new BadRequestException("Este usuário já foi adicionado à família.");  
    }

    if (targetUser.familyId && targetUser.familyId !== familyId) {
      throw new BadRequestException("Este usuário já foi adicionado a outra família.");  
    }

    await this.prisma.user.update({ where: { id: user.id }, data: { familyId: familyId }})
    await this.prisma.user.update({ where: { id: targetUser.id }, data: { familyId: familyId }})

    return;
  }
}
