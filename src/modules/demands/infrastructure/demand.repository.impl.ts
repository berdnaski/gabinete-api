import { Injectable } from "@nestjs/common";
import { BaseTenantRepository } from "src/core/database/base-tenant.repository";
import { Demand } from "../domain/demand.entity";
import { DemandRepository } from "../domain/demand.repository";
import { PrismaService } from "src/core/database/prisma.service";
import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";

@Injectable()
export class DemandRepositoryImpl extends BaseTenantRepository<Demand> implements DemandRepository {
    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async create(data: any): Promise<Demand> {
        return this.prisma.demand.create({
            data: {
                ...data,
                status: 'SUBMITTED',
            },
            include: {
                evidences: true,
                category: true,
                reporter: true,
            }
        }) as any;
    }

    async findById(id: string, cabinetId: string): Promise<Demand | null> {
        return this.findOneByTenant(this.prisma.demand, id, cabinetId, {
            evidences: true,
            category: true,
            reporter: true,
            assignee: true,
            comments: {
                include: { author: true },
                orderBy: { createdAt: 'desc' }
            }
        }) as any;
    }

    async list(cabinetId: string, params: PaginationParamsDto, filters?: any): Promise<PaginatedResultDto<Demand>> {
        return this.findManyPaginated(this.prisma.demand, cabinetId, params, filters, {
            category: true,
            reporter: true,
        }) as any;
    }

    async update(id: string, cabinetId: string, data: Partial<Demand>): Promise<Demand> {
        return this.updateByTenant(this.prisma.demand, id, cabinetId, data) as any;
    }

    async delete(id: string, cabinetId: string): Promise<Demand> {
        return this.softDeleteByTenant(this.prisma.demand, id, cabinetId) as any;
    }

    async addEvidence(demandId: string, url: string, key: string, mimeType: string): Promise<void> {
        await this.prisma.demandEvidence.create({
            data: {
                url,
                key,
                mimeType,
                demandId,
            }
        });
    }

    async findEvidenceById(id: string): Promise<any> {
        return this.prisma.demandEvidence.findUnique({
            where: { id }
        });
    }

    async deleteEvidence(id: string): Promise<void> {
        await this.prisma.demandEvidence.delete({
            where: { id }
        });
    }

    async updateStatus(id: string, cabinetId: string, status: any): Promise<Demand> {
        return this.updateByTenant(this.prisma.demand, id, cabinetId, { status }) as any;
    }

    async assign(id: string, cabinetId: string, assigneeId: string | null): Promise<Demand> {
        return this.updateByTenant(this.prisma.demand, id, cabinetId, { assigneeId }) as any;
    }

    async addComment(demandId: string, authorId: string, content: string): Promise<any> {
        return this.prisma.demandComment.create({
            data: {
                content,
                demandId,
                authorId,
            },
            include: {
                author: {
                    select: { id: true, name: true }
                }
            }
        });
    }

    async findCommentById(id: string): Promise<any> {
        return this.prisma.demandComment.findUnique({
            where: { id }
        });
    }

    async updateComment(id: string, content: string): Promise<any> {
        return this.prisma.demandComment.update({
            where: { id },
            data: { content },
            include: {
                author: {
                    select: { id: true, name: true }
                }
            }
        });
    }

    async deleteComment(id: string): Promise<void> {
        await this.prisma.demandComment.delete({
            where: { id }
        });
    }
}
