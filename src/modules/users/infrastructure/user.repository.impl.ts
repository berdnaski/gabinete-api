import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { Role } from '@prisma/client';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } }) as Promise<User | null>;
    }

    async create(data: {
        name: string;
        email: string;
        password: string;
        role?: Role;
        cabinetId: string;
    }): Promise<User> {
        return this.prisma.user.create({
            data: {
                ...data,
            },
        }) as Promise<User>;
    }
}
