import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { Role } from '@prisma/client';
import { BaseTenantRepository } from 'src/core/database/base-tenant.repository';

import { PaginationParamsDto } from 'src/shared/pagination/pagination-params.dto';
import { PaginatedResultDto } from 'src/shared/pagination/paginated-result.dto';

@Injectable()
export class UserRepositoryImpl extends BaseTenantRepository<User> implements UserRepository {
    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } }) as Promise<User | null>;
    }

    async findById(id: string, cabinetId: string): Promise<User | null> {
        return this.findOneByTenant(this.prisma.user, id, cabinetId) as Promise<User | null>;
    }

    async list(cabinetId: string, params: PaginationParamsDto): Promise<PaginatedResultDto<User>> {
        return this.findManyPaginated(this.prisma.user, cabinetId, params) as Promise<PaginatedResultDto<User>>;
    }

    async update(id: string, cabinetId: string, data: Partial<User>): Promise<User> {
        return this.updateByTenant(this.prisma.user, id, cabinetId, data) as Promise<User>;
    }

    async delete(id: string, cabinetId: string): Promise<User> {
        return this.softDeleteByTenant(this.prisma.user, id, cabinetId) as Promise<User>;
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
