import { Injectable } from "@nestjs/common";
import { BaseTenantRepository } from "src/core/database/base-tenant.repository";
import { Category } from "../domain/category.entity";
import { CategoryRepository } from "../domain/category.repository";
import { PrismaService } from "src/core/database/prisma.service";
import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";

@Injectable()
export class CategoryRepositoryImpl extends BaseTenantRepository<Category> implements CategoryRepository {
    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async create(data: Category): Promise<Category> {
        return this.prisma.category.create({
            data: {
                ...data,
            }
        }) as Promise<Category>;
    }

    async findByName(name: string, cabinetId: string): Promise<Category | null> {
        return this.prisma.category.findFirst({
            where: {
                name,
                cabinetId,
            },
        }) as Promise<Category | null>;
    }

    async list(cabinetId: string, params: PaginationParamsDto): Promise<PaginatedResultDto<Category>> {
        return this.findManyPaginated(this.prisma.category, cabinetId, params) as Promise<PaginatedResultDto<Category>>;
    }

    async findById(id: string, cabinetId: string): Promise<Category | null> {
        return this.prisma.category.findUnique({
            where: {
                id,
                cabinetId,
            },
        }) as Promise<Category | null>;
    }

    async update(id: string, cabinetId: string, data: Partial<Category>): Promise<Category> {
        return this.updateByTenant(this.prisma.category, id, cabinetId, data) as Promise<Category>;
    }

    async delete(id: string, cabinetId: string): Promise<Category> {
        return this.softDeleteByTenant(this.prisma.category, id, cabinetId) as Promise<Category>;
    }
}