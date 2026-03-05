import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async create(data: { name: string; email: string; password: string }): Promise<User> {
        return this.prisma.user.create({ data });
    }
}
