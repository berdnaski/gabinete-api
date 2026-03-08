import { Injectable } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";
import { Demand } from "../domain/demand.entity";

@Injectable()
export class ListDemandsUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(cabinetId: string, params: PaginationParamsDto, filters?: any): Promise<PaginatedResultDto<Demand>> {
        return this.demandRepository.list(cabinetId, params, filters);
    }
}
