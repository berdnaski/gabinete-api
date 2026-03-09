import { Injectable } from "@nestjs/common";
import { ResultFilters, ResultRepository } from "../domain/result.repository";
import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";
import { Result } from "../domain/result.entity";

@Injectable()
export class ListResultsUseCase {
    constructor(
        private readonly resultRepository: ResultRepository,
    ) { }

    async execute(cabinetId: string, params: PaginationParamsDto, filters?: ResultFilters): Promise<PaginatedResultDto<Result>> {
        return this.resultRepository.list(cabinetId, params, filters);
    }
}