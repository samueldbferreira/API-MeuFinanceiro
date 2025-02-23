import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly JwtService: JwtService) {}

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

    const payload = { sub: newUser.id, username: newUser.firstName };
    const token = await this.JwtService.signAsync(payload);

    return {
      access_token: token,
      user: newUser
    };
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }

    const { password, ...userData } = user;

    return userData;
  }
}
