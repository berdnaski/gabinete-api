import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { BaseTenantRepository } from "src/core/database/base-tenant.repository";
import { ResultRepository } from "../domain/result.repository";
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

    async list(cabinetId: string, params: PaginationParamsDto, filters?: Partial<Result>): Promise<PaginatedResultDto<Result>> {
        return this.findManyPaginated(
            this.prisma.result,
            cabinetId,
            params,
            filters,
            { images: { where: { isActive: true } } }
        );
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
