import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: CreateUserDTO) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userAlreadyExists) {
      throw new BadRequestException('Este email já está sendo utilizado.');
    }

    const encodedPassword = await hash(data.password, 8);

    const { password, ...newUser } = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: encodedPassword,
      },
    });

    return newUser;
  }
}
