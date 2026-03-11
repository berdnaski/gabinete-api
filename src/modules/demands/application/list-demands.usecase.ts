import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";
import { ListDemandsDto } from "../dto/list-demands.dto";
import { Demand } from "../domain/demand.entity";
import { DemandRepository } from "../domain/demand.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListDemandsUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(cabinetId: string, params: ListDemandsDto): Promise<PaginatedResultDto<Demand>> {
        const { search, status, priority, startDate, endDate, ...pagination } = params;

        const filters: any = {};
        if (status) filters.status = status;
        if (priority) filters.priority = priority;

        if (startDate || endDate) {
            filters.createdAt = {};
            if (startDate) filters.createdAt.gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                filters.createdAt.lte = end;
            }
        }

        if (search) {
            filters.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        return this.demandRepository.list(cabinetId, pagination as any, filters);
    }
}
