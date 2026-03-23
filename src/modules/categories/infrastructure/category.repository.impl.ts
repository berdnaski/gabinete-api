import { Injectable } from "@nestjs/common";
import { Category } from "../domain/category.entity";
import { CategoryRepository } from "../domain/category.repository";
import { PrismaService } from "src/core/database/prisma.service";
import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";
import { paginate } from "src/shared/pagination/paginate";

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<Category> {
        return await this.prisma.category.create({ data });
    }

    async findByName(name: string): Promise<Category | null> {
        return await this.prisma.category.findFirst({ where: { name } });
    }

    async list(params: PaginationParamsDto): Promise<PaginatedResultDto<Category>> {
        return paginate<Category>(this.prisma.category, params, { isActive: true }, { orderBy: { name: 'asc' } });
    }

    async findById(id: string): Promise<Category | null> {
        return await this.prisma.category.findUnique({ where: { id } });
    }

    async update(id: string, data: Partial<Category>): Promise<Category> {
        return await this.prisma.category.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Category> {
        return await this.prisma.category.update({ where: { id }, data: { isActive: false } });
    }
}