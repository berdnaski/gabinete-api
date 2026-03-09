import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { BaseTenantRepository } from "src/core/database/base-tenant.repository";
import { ResultRepository, ResultFilters } from "../domain/result.repository";
import { Result } from "../domain/result.entity";
import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";
import { ImageType, Prisma } from "@prisma/client";

@Injectable()
export class ResultRepositoryImpl extends BaseTenantRepository<Result> implements ResultRepository {
    constructor(protected readonly prisma: PrismaService) {
        super();
    }

    async create(data: Partial<Result>): Promise<Result> {
        return this.prisma.result.create({
            data: data as Prisma.ResultCreateInput,
            include: { images: { where: { isActive: true } } }
        }) as unknown as Result;
    }

    async findById(id: string, cabinetId: string): Promise<Result | null> {
        return this.findOneByTenant(this.prisma.result, id, cabinetId, {
            images: { where: { isActive: true } }
        });
    }

    async list(cabinetId: string, params: PaginationParamsDto, filters?: ResultFilters): Promise<PaginatedResultDto<Result>> {
        const { isPublic, ...restFilters } = filters || {};
        const extraWhere: any = { ...restFilters };

        if (isPublic !== undefined) {
            extraWhere.isPublic = isPublic;
        }

        return this.findManyPaginated(
            this.prisma.result,
            cabinetId,
            params,
            extraWhere,
            { images: { where: { isActive: true } } }
        );
    }

    async listPublic(params: PaginationParamsDto, cabinetId?: string): Promise<PaginatedResultDto<Result>> {
        const { skip, limit } = params;
        const where: any = {
            isActive: true,
            isPublic: true,
        };

        if (cabinetId) {
            where.cabinetId = cabinetId;
        }

        const [items, total] = await Promise.all([
            this.prisma.result.findMany({
                where,
                skip,
                take: limit,
                include: { images: { where: { isActive: true } } },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.result.count({ where }),
        ]);

        return new PaginatedResultDto<Result>(
            items as unknown as Result[],
            total,
            params.page ?? 1,
            params.limit ?? 10
        );
    }

    async findByIdPublic(id: string): Promise<Result | null> {
        return this.prisma.result.findFirst({
            where: {
                id,
                isActive: true,
                isPublic: true,
            },
            include: { images: { where: { isActive: true } } }
        }) as unknown as Result;
    }

    async update(id: string, cabinetId: string, data: Partial<Result>): Promise<Result> {
        return this.updateByTenant(this.prisma.result, id, cabinetId, data as Prisma.ResultUpdateInput) as unknown as Result;
    }

    async delete(id: string, cabinetId: string): Promise<void> {
        await this.softDeleteByTenant(this.prisma.result, id, cabinetId);
    }

    async addImage(resultId: string, url: string, key: string, type: ImageType): Promise<void> {
        await this.prisma.resultImage.create({
            data: {
                url,
                key,
                type,
                resultId
            }
        });
    }

    async findImageById(id: string): Promise<Prisma.ResultImageGetPayload<{}> | null> {
        return this.prisma.resultImage.findFirst({
            where: { id, isActive: true }
        });
    }

    async deleteImage(id: string): Promise<void> {
        await this.prisma.resultImage.update({
            where: { id },
            data: { isActive: false }
        });
    }
}
